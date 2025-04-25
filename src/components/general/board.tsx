import { FILES, IMAGES, RANKS } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { board_details } from "@/atoms/atoms";

const Board = () => {
  const [className, setClassname] = useState("");
  const { isFlipped } = useAtomValue(board_details);
  const squares = Array.from({ length: 64 });

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;

      setClassname(height > width ? "w-full" : "h-[calc(100vh-3rem)]");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className={cn("border aspect-square grid grid-cols-8 rounded-xl overflow-hidden", className)}
    >
      {squares.map((_, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const isLightSquare = (row + col) % 2 === 0;

        const isBottomRow = row === 7;
        const isLeftCol = col === 0;

        // Calculate file index for label:
        const fileIndex = isFlipped ? 7 - col : col;

        // Calculate rank index for label:
        const rankIndex = isFlipped ? row : 7 - row;

        return (
          <div
            key={i}
            className={cn(
              "border relative select-none flex items-center justify-center",
              isLightSquare ? "bg-light-brown" : "bg-dark-brown"
            )}
          >
            {/* Render file label on bottom row */}
            {isBottomRow && (
              <span
                className={cn(
                  "absolute bottom-1 right-1 text-xs md:text-sm lg:text-base font-medium select-none",
                  isLightSquare ? "text-dark-brown" : "text-light-brown"
                )}
              >
                {FILES[fileIndex]}
              </span>
            )}

            {/* Render rank label on left column */}
            {isLeftCol && (
              <span
                className={cn(
                  "absolute top-1 left-1 text-xs md:text-sm lg:text-base font-medium select-none",
                  isLightSquare ? "text-dark-brown" : "text-light-brown"
                )}
              >
                {RANKS[rankIndex]}
              </span>
            )}

            {/* Render piece images */}
            {/* Uncomment and replace with actual piece rendering logic */}
            <img src={IMAGES.pieces.black.queen} alt="White King" className="size-3/4" />
          </div>
        );
      })}
    </section>
  );
};

export default Board;
