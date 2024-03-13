import React, { useEffect } from "react";
import lottie from "lottie-web";
import animationData from "./Animation - 1709728319895.json";

function Loading() {
  useEffect(() => {
    const animationContainer = document.getElementById("animation-container");
    if (animationContainer) {
      const anim = lottie.loadAnimation({
        container: animationContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });

      // Clean up animation when component unmounts
      return () => {
        anim.destroy();
      };
    }
  }, []); // Run only once when the component mounts

  return (
    <div className="background d-flex flex-column justify-content-center align-items-center ">
      <div
        id="animation-container"
        style={{ width: "50%", height: "50%" }}
      ></div>
    </div>
  );
}

export default Loading;
