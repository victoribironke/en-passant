import { board_details, game_details } from "@/atoms/atoms";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Repeat2 } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

const BottomBar = () => {
  const [step, setStep] = useState(0);
  const { positions } = useAtomValue(game_details);
  const setBoardDetails = useSetAtom(board_details);

  const totalSteps = positions.length - 1;

  useEffect(() => {
    setBoardDetails((prev) => ({ ...prev, position: positions[step] }));
  }, [step]);

  return (
    <div className="rounded-xl bg-gradient-to-b from-black/80 via-black/90 to-black shadow-lg shadow-black/60 ring-1 ring-white/10 py-4 px-6 fixed bottom-8 flex gap-6 items-center justify-center transform transition-transform opacity-50 hover:opacity-100">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Repeat2
              onClick={() => setBoardDetails((prev) => ({ ...prev, isFlipped: !prev.isFlipped }))}
              className="cursor-pointer"
              size={30}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Flip board</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ChevronsLeft onClick={() => setStep(0)} className="cursor-pointer" size={30} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Go to start</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ChevronLeft
              onClick={() => setStep((s) => (s !== 0 ? s - 1 : s))}
              className="cursor-pointer"
              size={30}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Previous move</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ChevronRight
              onClick={() => setStep((s) => (s !== totalSteps ? s + 1 : s))}
              className="cursor-pointer"
              size={30}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Next move</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ChevronsRight
              onClick={() => setStep(totalSteps)}
              className="cursor-pointer"
              size={30}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Go to end</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default BottomBar;
