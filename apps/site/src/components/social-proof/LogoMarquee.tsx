import { CUSTOMER_LOGOS } from '../../lib/customer-data';

export default function LogoMarquee() {
  return (
    <div className="relative flex overflow-hidden w-full group py-10 bg-white/50 backdrop-blur-sm border-y border-slate-100">
      <div className="flex w-max animate-marquee">
        <div className="flex space-x-20 px-10 items-center whitespace-nowrap">
          {CUSTOMER_LOGOS.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="text-2xl md:text-3xl font-black tracking-tighter text-slate-300 hover:text-indigo-600 transition-colors duration-500 cursor-default select-none font-heading grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
            >
              {logo.name.toUpperCase()}
            </div>
          ))}
        </div>
        <div className="flex space-x-20 px-10 items-center whitespace-nowrap" aria-hidden="true">
          {CUSTOMER_LOGOS.map((logo, idx) => (
            <div
              key={`${logo.name}-clone-${idx}`}
              className="text-2xl md:text-3xl font-black tracking-tighter text-slate-300 hover:text-indigo-600 transition-colors duration-500 cursor-default select-none font-heading grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
            >
              {logo.name.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* Extreme Fade Out Gradients */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
