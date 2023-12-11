import { useEffect } from "react";

const useRenderRain = (drops: number, enable = true) => {
  useEffect(() => {
    if (enable) {
      const createRain = () => {
        const rainContainer = document.getElementById("rain-container");

        for (let i = 0; i < drops; i++) {
          const drop = document.createElement("div");
          drop.className = "drop";
          drop.style.left = `${Math.random() * 100}%`;
          drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
          rainContainer?.appendChild(drop);
        }
      };

      createRain();
    }

    return () => {
      const rainContainer = document.getElementById("rain-container");
      rainContainer ? (rainContainer.innerHTML = "") : "";
    };
  }, [drops, enable]);
};

export default useRenderRain;
