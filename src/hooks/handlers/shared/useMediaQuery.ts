import { useEffect, useState } from "react";

type Size = "small" | "medium" | "large";
type Device = "mobile" | "tablet" | "pc";

interface Screen {
  size: Size;
  device: Device;
}

const useMediaQuery = () => {
  const [screen, setScreen] = useState<Screen>({
    size: "large",
    device: "pc",
  });

  useEffect(() => {
    const checkScreen = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setScreen({ size: "small", device: "mobile" });
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setScreen({ size: "medium", device: "tablet" });
      } else {
        setScreen({ size: "large", device: "pc" });
      }
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  const devices = {
    isPC: screen.device === "pc",
    isTablet: screen.device === "tablet",
    isMobile: screen.device === "mobile",
  };

  return { screen, ...devices };
};

export default useMediaQuery;
