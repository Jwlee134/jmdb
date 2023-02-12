import { useEffect, useState } from "react";

export default function useImageLoad(src: string | string[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const promise = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          resolve();
        };
      });
    };

    if (Array.isArray(src)) {
      Promise.all(src.map((s) => promise(s))).then(() => {
        setLoaded(true);
      });
    } else {
      promise(src).then(() => {
        setLoaded(true);
      });
    }
  }, [src]);

  return loaded;
}
