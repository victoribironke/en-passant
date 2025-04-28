"use client";

import { FILES, RANKS } from "@/constants/constants";
import { cn, getPieceImage, parseFEN } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { board_details } from "@/atoms/atoms";
import { DEFAULT_POSITION } from "chess.js";

const Board = () => {
  const [className, setClassname] = useState("h-[calc(100vh-4.5rem)]");
  const { isFlipped, position } = useAtomValue(board_details);

  const board = parseFEN(position || DEFAULT_POSITION);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;

      setClassname(height > width ? "w-full" : "h-[calc(100vh-4.5rem)]");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className={cn("border aspect-square grid grid-cols-8 rounded-xl overflow-hidden", className)}
    >
      {Array.from({ length: 64 }).map((_, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;

        // Flip board visually by reversing row and col for pieces and colors
        const displayRow = isFlipped ? 7 - row : row;
        const displayCol = isFlipped ? 7 - col : col;

        const isLightSquare = (displayRow + displayCol) % 2 === 0;

        // Labels always on bottom row and left column (fixed positions)
        const isBottomRow = row === 7;
        const isLeftCol = col === 0;

        // Label content changes with flip
        const fileLabelIndex = isFlipped ? 7 - col : col;
        const rankLabelIndex = isFlipped ? row : 7 - row;

        // Get piece char and image using displayRow/displayCol as before
        const pieceChar = board[displayRow][displayCol];
        const pieceImage = getPieceImage(pieceChar);

        return (
          <div
            key={i}
            className={cn(
              "border relative select-none flex items-center justify-center",
              isLightSquare ? "bg-light-brown" : "bg-dark-brown"
            )}
          >
            {/* Files on bottom row */}
            {isBottomRow && (
              <span
                className={cn(
                  "absolute bottom-1 right-1 text-xs md:text-sm lg:text-base font-medium select-none",
                  isLightSquare ? "text-dark-brown" : "text-light-brown"
                )}
              >
                {FILES[fileLabelIndex]}
              </span>
            )}

            {/* Ranks on left column */}
            {isLeftCol && (
              <span
                className={cn(
                  "absolute top-1 left-1 text-xs md:text-sm lg:text-base font-medium select-none",
                  isLightSquare ? "text-dark-brown" : "text-light-brown"
                )}
              >
                {RANKS[rankLabelIndex]}
              </span>
            )}

            {/* Piece image */}
            {pieceImage && (
              <img
                src={pieceImage}
                alt={`Chess piece ${pieceChar}`}
                className="size-4/5 absolute pointer-events-none select-none"
                draggable={false}
              />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Board;
