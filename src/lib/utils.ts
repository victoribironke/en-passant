import { IMAGES } from "@/constants/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const parseFEN = (fen: string) => {
  const [piecePlacement] = fen.split(" ");
  const ranks = piecePlacement.split("/");

  const board = [];

  for (let rank of ranks) {
    const row = [];
    for (let char of rank) {
      if (/\d/.test(char)) {
        const emptySquares = parseInt(char, 10);
        for (let i = 0; i < emptySquares; i++) {
          row.push(null);
        }
      } else {
        row.push(char);
      }
    }
    board.push(row);
  }

  return board;
};

export const getPieceImage = (pieceChar: string | null) => {
  if (!pieceChar) return null;

  const isWhite = pieceChar === pieceChar.toUpperCase();
  const color = isWhite ? "white" : "black";
  const pieceType = pieceChar.toLowerCase();

  switch (pieceType) {
    case "p":
      return IMAGES.pieces[color].pawn;
    case "n":
      return IMAGES.pieces[color].knight;
    case "b":
      return IMAGES.pieces[color].bishop;
    case "r":
      return IMAGES.pieces[color].rook;
    case "q":
      return IMAGES.pieces[color].queen;
    case "k":
      return IMAGES.pieces[color].king;
    default:
      return null;
  }
};
