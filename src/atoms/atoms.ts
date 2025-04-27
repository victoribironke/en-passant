import { Game } from "@/types/general";
import { atom } from "jotai";

const board_details = atom({
  isFlipped: false,
  position: "",
});

const game_details = atom<Game>({
  pgn: "",
  positions: [],
});

export { board_details, game_details };
