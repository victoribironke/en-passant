import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BOTTOM_BAR } from "@/constants/constants";

const BottomBar = () => {
  return (
    <div className="rounded-xl bg-gradient-to-b from-black/80 via-black/90 to-black shadow-lg shadow-black/60 ring-1 ring-white/10 py-4 px-6 fixed bottom-8 flex gap-6 items-center justify-center transform transition-transform opacity-50 hover:opacity-100">
      {BOTTOM_BAR().map((t, i) => (
        <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger>
              <t.icon onClick={t.action} className="cursor-pointer" size={30} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default BottomBar;
