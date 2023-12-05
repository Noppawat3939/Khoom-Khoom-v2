import { useAppTheme } from "@/hooks";
import React, { type FC } from "react";
import { Button } from "..";
import { renderBannerStyles } from "@/utils";

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

  const _styles = renderBannerStyles(times);

  return (
    <section
      about="banner-section"
      className={`
       ${_styles?.bg}
       bg-gradient-to-b flex flex-col h-[95vh] justify-center items-center`}
    >
      <h1
        className={`text-[7rem] text-center max-lg:text-[5rem] max-md-[5rem] max-sm:[2rem] font-semibold bg-gradient-to-r ${_styles?.headerColor} inline-block text-transparent bg-clip-text`}
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
