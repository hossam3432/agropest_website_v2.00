import { ResponsiveImage } from "@/components/ResponsiveImage";

const ORANGE = "#F14723";
const BLUE = "#0E4B9F";
const INK = "#0A2A57";

type RivalDuoOomyceteCardsProps = {
  card1: { image: string; title: string; text: string };
  card2: { image: string; title: string; text: string };
};

export function RivalDuoOomyceteCards({ card1, card2 }: RivalDuoOomyceteCardsProps) {
  return (
    <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5 xl:mt-7 xl:gap-7">
      <article className="relative mx-auto w-[68%] overflow-hidden rounded-lg shadow-[0_20px_60px_rgba(14,75,159,0.12)] sm:w-full lg:w-[78%] xl:w-[86%] 2xl:w-[92%]">
        {/* The caption strip below is h/3 of this box — keep the two clamps in sync. */}
        <div className="h-72 w-full overflow-hidden bg-white sm:h-[clamp(280px,36vh,400px)] xl:h-[clamp(280px,40vh,520px)]">
          <ResponsiveImage src={card1.image} alt="" className="h-full w-full object-cover" objectFit="cover" sizes="(min-width: 640px) 50vw, 68vw" />
        </div>
        {/* min-h, not h: the strip still matches image/3 as a floor, but grows for
            the longer caption instead of clipping it. pb keeps it off the edge. */}
        <div className="absolute inset-x-0 bottom-0 min-h-24 overflow-hidden bg-white/70 p-3 pb-4 backdrop-blur-sm sm:min-h-[calc(clamp(280px,36vh,400px)/3)] sm:p-4 sm:pb-5 xl:min-h-[calc(clamp(280px,40vh,520px)/3)] xl:p-5 xl:pb-6">
          <h3 className="text-sm font-extrabold leading-tight sm:text-base xl:text-lg" style={{ color: INK }}>
            <span className="me-3" style={{ color: ORANGE }}>01</span>
            {card1.title}
          </h3>
          <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6 xl:text-[0.9375rem] xl:leading-6">{card1.text}</p>
        </div>
      </article>
      <article className="relative mx-auto w-[68%] overflow-hidden rounded-lg shadow-[0_20px_60px_rgba(14,75,159,0.12)] sm:w-full lg:w-[78%] xl:w-[86%] 2xl:w-[92%]">
        {/* The caption strip below is h/3 of this box — keep the two clamps in sync. */}
        <div className="h-72 w-full overflow-hidden bg-white sm:h-[clamp(280px,36vh,400px)] xl:h-[clamp(280px,40vh,520px)]">
          <ResponsiveImage src={card2.image} alt="" className="h-full w-full object-cover" objectFit="cover" sizes="(min-width: 640px) 50vw, 68vw" />
        </div>
        <div className="absolute inset-x-0 bottom-0 min-h-24 overflow-hidden bg-white/70 p-3 pb-4 backdrop-blur-sm sm:min-h-[calc(clamp(280px,36vh,400px)/3)] sm:p-4 sm:pb-5 xl:min-h-[calc(clamp(280px,40vh,520px)/3)] xl:p-5 xl:pb-6">
          <h3 className="text-sm font-extrabold leading-tight sm:text-base xl:text-lg" style={{ color: INK }}>
            <span className="me-3" style={{ color: BLUE }}>02</span>
            {card2.title}
          </h3>
          <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6 xl:text-[0.9375rem] xl:leading-6">{card2.text}</p>
        </div>
      </article>
    </div>
  );
}
