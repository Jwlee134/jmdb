import { useEffect, useState } from "react";

export default function useImageLoad(src: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
    }).then(() => {
      setLoaded(true);
    });
  }, [src]);

  return loaded;
}
