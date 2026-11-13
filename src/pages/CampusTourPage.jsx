// src/pages/CampusTourPage.jsx
import { useEffect, useRef, useState } from "react";

const CampusTourPage = () => {
  const iframeRef = useRef(null);
  const [isTourLoaded, setIsTourLoaded] = useState(false);

  useEffect(() => {
    const handleDeviceMotion = (e) => {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeWindow) return;

      iframeWindow.postMessage(
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
        "https://tour.panoee.net"
      );
    };

    window.addEventListener("devicemotion", handleDeviceMotion);
    return () => window.removeEventListener("devicemotion", handleDeviceMotion);
  }, []);

  return (
    <section id="campus-tour" className="min-h-screen bg-gray-100 py-28">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-4xl font-bold text-[#001830]">
          Campus Virtual Tour
        </h2>

        <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
          {!isTourLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-900 text-white">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#E4E454]" />
              <p className="text-sm text-gray-300">Loading 360° Campus Tour...</p>
            </div>
          )}

          <iframe
            ref={iframeRef}
            id="tour-embeded"
            name="CampusTour"
            title="Campus Virtual Tour"
            src="https://tour.panoee.net/iframe/6a3f47f36e7d8a904c2960d9"
            onLoad={() => setIsTourLoaded(true)}
            className="h-[70vh] w-full border-0 overflow-hidden md:h-[80vh]"
            allow="vr; xr; accelerometer; gyroscope; autoplay; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default CampusTourPage;