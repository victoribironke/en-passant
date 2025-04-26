import { pgn } from "@/atoms/atoms";
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
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

const NewGame = () => {
  const [currentPGN, setCurrentPGN] = useAtom(pgn);

  const [open, setOpen] = useState(currentPGN === "");
  const [source, setSource] = useState("pgn");
  const [username, setUsername] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={cn(buttonVariants({ variant: "outline" }), "mb-26 cursor-pointer")}>
          New Game
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
              <SelectItem value="lichess">Lichess</SelectItem>
            </SelectContent>
          </Select>

          {source === "pgn" && (
            <Textarea
              className="max-h-40"
              placeholder="Enter your PGN here"
              value={currentPGN}
              onChange={(e) => setCurrentPGN(e.target.value)}
            />
          )}

          {(source === "chesscom" || source === "lichess") && (
            <div className="flex items-center justify-center gap-2">
              <Input
                placeholder="Username"
                className="w-3/4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button className="w-1/4" disabled={!username}>
                Find games
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button className="w-full" disabled={!currentPGN}>
            Analyse
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewGame;
