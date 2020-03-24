import React from "react";
import { storiesOf } from "@storybook/react";

import RangeSliderDocs from "./RangeSlider.mdx";

storiesOf("Components|Inputs/RangeSlider", module).add("Documentation", () => (
  <RangeSliderDocs />
));

export const getColonSeparatedDuration = numSeconds => {
  const getMinutesAndSeconds = numSeconds => {
    const hours = Math.floor(numSeconds / 3600);
    const minutes = Math.floor((numSeconds % 3600) / 60);
    const seconds = Math.floor((numSeconds % 3600) % 60);
    return { hours, minutes, seconds };
  };
  const strPadLeft = (string, pad, length) =>
    (new Array(length + 1).join(pad) + string).slice(-length);
  const time = getMinutesAndSeconds(numSeconds);
  return `${strPadLeft(time.minutes, "0", 2)}:${strPadLeft(
    time.seconds,
    "0",
    2,
  )}`;
};

export const translateColonSeparatedDuration = (
  input,
  prevInputSeconds = 0,
) => {
  const isValidInput = input =>
    RegExp(`^[012345]?\\d?:[012345]?\\d?$`).test(input);
  const convertColonSeparatedDuration = duration => {
    const [minutes, seconds] = duration.split(":");
    return { minutes, seconds };
  };
  const getSeconds = ({ hours, minutes, seconds }) => {
    let totalSeconds = 0;
    totalSeconds += hours ? Number(hours) * 3600 : 0;
    totalSeconds += minutes ? Number(minutes) * 60 : 0;
    totalSeconds += Number(seconds);
    return totalSeconds;
  };
  if (isValidInput(input)) {
    const { minutes, seconds } = convertColonSeparatedDuration(input);
    return getSeconds({ minutes, seconds });
  }
  return prevInputSeconds;
};
