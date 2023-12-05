import { useAppTheme } from "@/hooks";
import React, { type FC } from "react";
import { Button } from "..";

type BannerProps = {
  title: string;
  description: string;
  textBtn: string;
  onClick?: <T>(arg?: T) => void;
};

const Banner: FC<BannerProps> = ({ title, description, textBtn, onClick }) => {
  const {
    state: { times },
  } = useAppTheme();

  return (
    <section
      about="banner-section"
      className={`
      ${
        times.isNight
          ? "from-foreground-900 from-40% to-[#2b5988]"
          : times.isMorning
          ? "from-[#caddff]"
          : "from-[#F3F3F3]"
      } bg-gradient-to-b w-full flex flex-col h-[95vh] justify-center items-center max-sm:px-[3%]`}
    >
      <h1
        className={`${
          times.isNight
            ? "from-slate-500  to-slate-300 to-90%"
            : "from-green-500 to-[#1B9C85]"
        } text-[7rem] text-center max-lg:text-[5rem] max-md-[5rem] max-sm:[2rem] font-semibold bg-gradient-to-r inline-block text-transparent bg-clip-text`}
      >
        {title}
      </h1>
      <p className="text-2xl max-md:text-xl text-foreground-400">
        {description}
      </p>

      <Button
        onClick={onClick}
        className={`mt-5 text-lg ${
          times.isNight ? "text-foreground-100" : "text-gray-400"
        }`}
        variant="bordered"
      >
        {textBtn}
      </Button>
    </section>
  );
};

export default Banner;
