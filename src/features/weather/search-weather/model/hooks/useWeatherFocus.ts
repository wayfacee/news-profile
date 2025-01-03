import { useRef, useState } from "react";
import { useClickAway } from "react-use";

export const useWeatherFocus = () => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  return { focused, setFocused, ref };
};
