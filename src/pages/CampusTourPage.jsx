// src/components/CampusTour.jsx

import { useEffect } from "react";

const CampusTourPage = () => {
  useEffect(() => {
    const handleDeviceMotion = (e) => {
      const iframe = document.getElementById("tour-embeded");

      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            type: "devicemotion",
            deviceMotionEvent: {
              acceleration: {
                x: e.acceleration?.x,
                y: e.acceleration?.y,
                z: e.acceleration?.z,
              },
              accelerationIncludingGravity: {
                x: e.accelerationIncludingGravity?.x,
                y: e.accelerationIncludingGravity?.y,
                z: e.accelerationIncludingGravity?.z,
              },
              rotationRate: {
                alpha: e.rotationRate?.alpha,
                beta: e.rotationRate?.beta,
                gamma: e.rotationRate?.gamma,
              },
              interval: e.interval,
              timeStamp: e.timeStamp,
            },
          },
          "*"
        );
      }
    };

    window.addEventListener("devicemotion", handleDeviceMotion);

    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, []);

  return (
    <section
      id="campus-tour"
      className="min-h-screen bg-gray-100 py-28"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="mb-10 text-center text-4xl font-bold text-[#001830]">
          Campus Virtual Tour
        </h2>

        {/* Tour Container */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          <iframe
            id="tour-embeded"
            name="CampusTour"
            title="Campus Virtual Tour"
            src="https://tour.panoee.net/iframe/6a3f47f36e7d8a904c2960d9"
            className="h-[70vh] w-full md:h-[80vh]"
            frameBorder="0"
            scrolling="no"
            allow="vr; xr; accelerometer; gyroscope; autoplay"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default CampusTourPage;