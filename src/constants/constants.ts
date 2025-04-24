import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RefreshCcwDot,
  Repeat2,
} from "lucide-react";

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

export const BOTTOM_BAR = [
  { icon: Repeat2, tooltip: "Flip board", action: () => alert("hi") },
  { icon: ChevronsLeft, tooltip: "Go to start", action: () => alert("hi") },
  { icon: ChevronLeft, tooltip: "Previous move", action: () => alert("hi") },
  { icon: ChevronRight, tooltip: "Next move", action: () => alert("hi") },
  { icon: ChevronsRight, tooltip: "Go to end", action: () => alert("hi") },
];
