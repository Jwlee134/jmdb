import { useEffect, useState } from "react";

export default function useDebounce(value: string, ms = 300) {
  const [res, setRes] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRes(value);
    }, ms);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, ms]);

  return res;
}
