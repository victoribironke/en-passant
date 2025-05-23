import { board_details, game_details } from "@/atoms/atoms";
import { PlayerData } from "@/types/general";
import { useAtomValue, useSetAtom } from "jotai";

export const THEME_KEY = "en-passant-theme";

export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const RANKS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const IMAGES = {
  pieces: {
    white: {
      king: "/pieces/white/king.svg",
      queen: "/pieces/white/queen.svg",
      rook: "/pieces/white/rook.svg",
      bishop: "/pieces/white/bishop.svg",
      knight: "/pieces/white/knight.svg",
      pawn: "/pieces/white/pawn.svg",
    },
    black: {
      king: "/pieces/black/king.svg",
      queen: "/pieces/black/queen.svg",
      rook: "/pieces/black/rook.svg",
      bishop: "/pieces/black/bishop.svg",
      knight: "/pieces/black/knight.svg",
      pawn: "/pieces/black/pawn.svg",
    },
  },
};

export const DEFAULT_SUMMARY: PlayerData[] = [
  {
    name: "Player 1",
    accuracy: 0,
    stats: {
      brilliant: 0,
      great: 0,
      best: 0,
      excellent: 0,
      good: 0,
      book: 0,
      inaccuracy: 0,
      mistake: 0,
      miss: 0,
      blunder: 0,
    },
    rating: 400,
  },
  {
    name: "Player 2",
    accuracy: 0,
    stats: {
      brilliant: 0,
      great: 0,
      best: 0,
      excellent: 0,
      good: 0,
      book: 0,
      inaccuracy: 0,
      mistake: 0,
      miss: 0,
      blunder: 0,
    },
    rating: 400,
  },
];
