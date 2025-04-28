import { game_details } from "@/atoms/atoms";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formatChesscomArchiveLink, getPositionsFromPGN } from "@/lib/utils";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { getGameDetails, getPlayerGamesArchives } from "@/lib/requests";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { ChesscomGame } from "@/types/general";

const NewGame = () => {
  const [game, setGame] = useAtom(game_details);

  const [open, setOpen] = useState(game.pgn === "");
  const [source, setSource] = useState("pgn");
  const [username, setUsername] = useState("");
  const [loadingArchives, setLoadingArchives] = useState(false);
  const [loadingGames, setLoadingGames] = useState(false);
  const [archives, setArchives] = useState<string[]>([]);
  const [timeframeUrl, setTimeframeUrl] = useState("");
  const [games, setGames] = useState<ChesscomGame[]>([]);
  const [page, setPage] = useState(1);
  const d = games.length / 20;
  const c = Number.isInteger(d) ? page !== Math.floor(d) : page !== Math.floor(d) + 1;

  const fetchGames = async () => {
    setLoadingArchives(true);

    const { data, error } = await getPlayerGamesArchives(username);

    setLoadingArchives(false);

    if (error) return toast.error(error);

    const reversed = data.reverse();

    setArchives(reversed);
    setTimeframeUrl(reversed[0]);
  };

  const reset = () => {
    setGames([]);
    setArchives([]);
    setTimeframeUrl("");
    setPage(1);
  };

  const analyseGame = () => {
    const positions = getPositionsFromPGN(game.pgn);

    setGame({ ...game, positions });
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (timeframeUrl) {
        setPage(1);

        setLoadingGames(true);

        const { data, error } = await getGameDetails(timeframeUrl);

        setLoadingGames(false);

        if (error) return toast.error(error);

        setGames(data);
      }
    })();
  }, [timeframeUrl]);

  useEffect(reset, [username]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(buttonVariants({ variant: "outline" }), "w-full mt-auto cursor-pointer")}
        >
          New Game
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl" onCloseAutoFocus={reset}>
        <DialogHeader>
          <DialogTitle>Analyse a new game</DialogTitle>
          <DialogDescription>Enter the PGN or select a game from an account.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pgn">PGN</SelectItem>
              <SelectItem value="chesscom">Chess.com</SelectItem>
              {/* <SelectItem value="lichess">Lichess</SelectItem> */}
            </SelectContent>
          </Select>

          {source === "pgn" && (
            <Textarea
              className="max-h-40"
              placeholder="Enter your PGN here"
              value={game.pgn}
              onChange={(e) => setGame({ ...game, pgn: e.target.value })}
            />
          )}

          {(source === "chesscom" || source === "lichess") && (
            <div className="flex items-center justify-center gap-4">
              <Input
                placeholder="Username"
                className="w-3/5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && fetchGames()}
                disabled={loadingArchives}
              />
              <Button
                className="w-2/5"
                disabled={!username || loadingArchives}
                onClick={fetchGames}
              >
                Find games {loadingArchives && <Loader className="animate-spin" />}
              </Button>
            </div>
          )}

          {archives.length > 0 && (
            <Select value={timeframeUrl} onValueChange={setTimeframeUrl}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a timeframe" />
              </SelectTrigger>
              <SelectContent>
                {archives.map((a, i) => (
                  <SelectItem value={a} key={i}>
                    {formatChesscomArchiveLink(a)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {loadingGames && <p className="w-full text-center">Loading games...</p>}

          {!loadingGames && games.length > 0 && (
            <>
              <div className="border p-2 rounded-lg max-h-72 overflow-y-auto flex flex-col gap-1">
                {games.slice(page * 20 - 20, page * 20).map((g, i) => {
                  const p = g.white.username === username ? g.white : g.black;

                  return (
                    <div className="w-full flex items-center justify-center gap-3 pr-2" key={i}>
                      <div
                        className={cn(
                          "flex items-center justify-between gap-2 w-full py-2 px-3 rounded-sm cursor-pointer border border-transparent hover:border-muted",
                          game.pgn === g.pgn && "bg-muted"
                        )}
                        onClick={() => setGame({ ...game, pgn: g.pgn })}
                      >
                        <div className="text-sm flex items-center gap-2">
                          {g.white.username} ({g.white.rating})
                        </div>

                        <div className="text-sm flex items-center gap-2">
                          ({g.black.rating}) {g.black.username}
                        </div>
                      </div>

                      <div
                        className={cn(
                          "size-4 rounded-sm",
                          p.result === "win"
                            ? "bg-green-400"
                            : p.result === "insufficient"
                            ? "bg-muted-foreground"
                            : "bg-red-400"
                        )}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-2 flex-col sm:flex-row w-full">
                <p className="text-sm sm:mr-auto">
                  Showing {page * 20 - 19} to{" "}
                  {c ? (games.length < 20 ? games.length : page * 20) : games.length} of{" "}
                  {games.length} games
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => page !== 1 && setPage((p) => p - 1)}
                    disabled={page === 1}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => c && setPage((p) => p + 1)}
                    disabled={!c}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button className="w-full cursor-pointer" disabled={!game.pgn} onClick={analyseGame}>
            Analyse
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewGame;
