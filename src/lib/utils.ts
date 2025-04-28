import { IMAGES } from "@/constants/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Chess } from "chess.js";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const parseFEN = (fen: string) => {
  const [piecePlacement] = fen.split(" ");
  const ranks = piecePlacement.split("/");

  const board = [];

  for (const rank of ranks) {
    const row = [];
    for (const char of rank) {
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

export const formatChesscomArchiveLink = (link: string) => {
  const splitted = link.split("/");

  const month = splitted.at(-1);
  const year = splitted.at(-2);

  const monthMap = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  return `${monthMap[month as keyof typeof monthMap]} ${year}`;
};

export const getPositionsFromPGN = (pgn: string) => {
  const chess = new Chess();
  chess.loadPgn(pgn);

  const moves = chess.history();
  const positions = []; // store FENs after each move

  chess.reset();

  for (const move of moves) {
    chess.move(move);
    positions.push(chess.fen());
  }

  return positions;
};

export const timeSince = (msTimestamp: number) => {
  const now = Date.now();
  let diff = Math.abs(now - msTimestamp) / 1000; // difference in seconds

  const units = [
    { name: "y", seconds: 365 * 24 * 60 * 60 },
    { name: "mo", seconds: 30 * 24 * 60 * 60 },
    { name: "w", seconds: 7 * 24 * 60 * 60 },
    { name: "d", seconds: 24 * 60 * 60 },
    { name: "h", seconds: 60 * 60 },
    { name: "m", seconds: 60 },
    { name: "s", seconds: 1 },
  ];

  for (const unit of units) {
    const amount = Math.floor(diff / unit.seconds);
    if (amount >= 1) {
      return amount + unit.name;
    }
  }

  return "0s"; // less than 1 second
};
