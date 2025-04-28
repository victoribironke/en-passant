import { Button } from "../ui/button";
import { DEFAULT_SUMMARY } from "@/constants/constants";
import NewGame from "./new-game";

const GameSummary = () => {
  const players = DEFAULT_SUMMARY;

  // Labels for each stat category
  const statLabels = {
    brilliant: "Brilliant",
    great: "Great",
    best: "Best",
    excellent: "Excellent",
    good: "Good",
    book: "Book",
    inaccuracy: "Inaccuracy",
    mistake: "Mistake",
    miss: "Miss",
    blunder: "Blunder",
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center min-w-[24rem] max-w-lg rounded-xl bg-gradient-to-br from-dark-brown/10 to-dark-brown/20 border-2 py-4 px-6 mb-26 xl:mb-0">
      {/* Header with player names and avatars */}
      <div className="grid grid-cols-3 mb-4 mt-2 w-full">
        <div className="flex flex-col items-center text-lg">{players[0].name || "Player 1"}</div>

        <div className="flex items-center justify-center">
          {/* Empty center column in header */}
        </div>

        <div className="flex flex-col items-center text-lg">{players[1].name || "Player 2"}</div>
      </div>

      {/* Accuracy row */}
      <div className="grid grid-cols-3 py-2 mb-4 w-full">
        <div className="text-center">
          <Button variant="secondary" className="lg:text-base">
            {players[0].accuracy}
          </Button>
        </div>
        <div className="text-gray-300 flex items-center justify-center">Accuracy</div>
        <div className="text-center">
          <Button variant="secondary" className="lg:text-base">
            {players[1].accuracy}
          </Button>
        </div>
      </div>

      {/* Stats rows */}
      {Object.entries(statLabels).map(([key, label]) => (
        <div key={key} className="grid grid-cols-3 py-2 mb-2 rounded-lg w-full">
          <div className="text-center">
            {players[0].stats[key as keyof (typeof players)[0]["stats"]]}
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-300">{label}</span>
          </div>
          <div className="text-center">
            {players[1].stats[key as keyof (typeof players)[1]["stats"]]}
          </div>
        </div>
      ))}

      <NewGame />
    </section>
  );
};

export default GameSummary;
