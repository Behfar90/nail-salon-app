import { colors } from "@utils";
import { eachDayOfInterval, addDays, subDays, format, getDay } from "date-fns";
import React from "react";

type rangeType = { start: string; end: string };

export interface DateDataType {
  startAt: string;
  endAt: string;
  offDays: string[];
  breaks: { from: string; to: string }[];
}

const RANGE = 50; // Max amount of months allowed to scroll to the past/future. Default = 50
const DEFAULT_DAY_DETAILS: DateDataType = {
  startAt: "08:00",
  endAt: "16:00",
  offDays: [],
  breaks: [
    {
      from: "12:00",
      to: "13:00",
    },
  ],
};
const initialDate = new Date().toISOString().split("T")[0];

export function useCalendarAdmin() {
  const [selected, setSelected] = React.useState("");
  const [longSelectedRange, setLongSelectedRange] = React.useState<rangeType>({
    start: "",
    end: "",
  });

  const betweenStartAndEndDays =
    longSelectedRange.start.length && longSelectedRange.end.length
      ? eachDayOfInterval({
          start: addDays(longSelectedRange.start, 1),
          end: subDays(longSelectedRange.end, 1),
        }).reduce((acc, date) => {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const dateStr = `${year}-${month}-${day}`;

          acc[dateStr] = {
            color: colors.secondary,
            textColor: colors.darkGray,
          };
          return acc;
        }, {} as { [key: string]: { color: string; textColor: string } }) // Add index signature to the type of acc
      : {};

  const marked = React.useMemo(() => {
    return {
      [longSelectedRange.start]: {
        startingDay: true,
        color: colors.secondary,
        textColor: colors.darkGray,
      },
      ...betweenStartAndEndDays,
      [longSelectedRange.end]: {
        endingDay: true,
        color: colors.secondary,
        textColor: colors.darkGray,
      },
      ...(selected !== ""
        ? {
            [selected]: {
              disableTouchEvent: true,
              color: colors.primary,
              textColor: colors.white,
            },
          }
        : {}),
    };
  }, [selected, longSelectedRange.start, longSelectedRange.end]);

  const updateSelectRange = (date: string) => {
    if (longSelectedRange.start === "") {
      setLongSelectedRange({ start: date, end: "" });
    } else if (longSelectedRange.start !== "" && longSelectedRange.end === "") {
      if (date > longSelectedRange.start) {
        setLongSelectedRange((prev) => ({ ...prev, end: date }));
      } else {
        setLongSelectedRange({ start: date, end: "" });
      }
    } else {
      setLongSelectedRange({ start: date, end: "" });
    }
  };

  const resetSelectRange = () => {
    setLongSelectedRange({ start: "", end: "" });
  };

  const getFormattedDate = (date: string, pattern: string) =>
    format(new Date(date), pattern);

  const getDayOfTheWeek = (date: string) => getDay(new Date(date));

  const submitDayDetails = (data: DateDataType) => {
    console.log(data);
  };

  return {
    selected,
    setSelected,
    longSelectedRange,
    updateSelectRange,
    resetSelectRange,
    getFormattedDate,
    getDayOfTheWeek,
    submitDayDetails,
    marked,
    initialDate,
    RANGE,
    DEFAULT_DAY_DETAILS,
  };
}
