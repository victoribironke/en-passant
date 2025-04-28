"use client";

import BottomBar from "./bottom-bar";
import GameSummary from "./game-summary";
import Board from "./board";

const Home = () => {
  return (
    <main className="w-full max-w-7xl h-auto flex flex-col xl:flex-row gap-8 items-center xl:items-stretch justify-center relative">
      <Board />
      <GameSummary />
      <BottomBar /> {/* Maybe show the current move here */}
    </main>
  );
};

export default Home;
