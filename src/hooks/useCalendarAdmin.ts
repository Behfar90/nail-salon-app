import { colors } from "@utils";
import { eachDayOfInterval, addDays, subDays } from "date-fns";
import React from "react";

const RANGE = 50; // Max amount of months allowed to scroll to the past/future. Default = 50
const initialDate = new Date().toISOString().split("T")[0];

type rangeType = { start: string; end: string };

export function useCalendarAdmin() {
  const [selected, setSelected] = React.useState(initialDate);
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
      [selected]: {
        disableTouchEvent: true,
        color: colors.primary,
        textColor: colors.white,
      },
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

  return {
    selected,
    setSelected,
    longSelectedRange,
    updateSelectRange,
    marked,
    initialDate,
    RANGE,
  };
}
