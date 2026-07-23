const ORANGE = "#F14723";
const BLUE = "#0E4B9F";
const INK = "#0A2A57";

type RivalDuoOomyceteCardsProps = {
  card1: { image: string; title: string; text: string };
  card2: { image: string; title: string; text: string };
};

export function RivalDuoOomyceteCards({ card1, card2 }: RivalDuoOomyceteCardsProps) {
  return (
    <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
      <article className="relative mx-auto w-[68%] overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(14,75,159,0.12)] sm:w-full lg:w-[78%]">
        <div className="h-72 w-full overflow-hidden bg-white sm:h-[clamp(280px,36vh,400px)]">
          <img src={card1.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 overflow-hidden bg-white/70 p-3 backdrop-blur-sm sm:h-[calc(clamp(280px,36vh,400px)/3)] sm:p-4">
          <h3 className="text-sm font-extrabold leading-tight sm:text-base" style={{ color: INK }}>
            <span className="mr-1.5" style={{ color: ORANGE }}>01</span>
            {card1.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-4 text-slate-600 sm:text-sm sm:leading-5">{card1.text}</p>
        </div>
      </article>
      <article className="relative mx-auto w-[68%] overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(14,75,159,0.12)] sm:w-full lg:w-[78%]">
        <div className="h-72 w-full overflow-hidden bg-white sm:h-[clamp(280px,36vh,400px)]">
          <img src={card2.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 overflow-hidden bg-white/70 p-3 backdrop-blur-sm sm:h-[calc(clamp(280px,36vh,400px)/3)] sm:p-4">
          <h3 className="text-sm font-extrabold leading-tight sm:text-base" style={{ color: INK }}>
            <span className="mr-1.5" style={{ color: BLUE }}>02</span>
            {card2.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-4 text-slate-600 sm:text-sm sm:leading-5">{card2.text}</p>
        </div>
      </article>
    </div>
  );
}
