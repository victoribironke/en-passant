"use client";

import BottomBar from "./bottom-bar";
import GameSummary from "./game-summary";
import Board from "./board";
import NewGame from "./new-game";

const Home = () => {
  return (
    <main className="w-full h-auto flex flex-col gap-8 items-center justify-center relative">
      <Board />
      <GameSummary />
      <BottomBar /> {/* Maybe show the current move here */}
      <NewGame />
    </main>
  );
};

export default Home;
