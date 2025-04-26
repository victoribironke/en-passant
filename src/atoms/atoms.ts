import { atom } from "jotai";

const board_details = atom({
  isFlipped: false,
});

const pgn = atom("");

export { board_details, pgn };
