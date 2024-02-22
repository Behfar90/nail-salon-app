import { useState } from "react";
import { addMonths, subMonths, addDays, subDays } from "date-fns";

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const currentMonth = () => {
    return currentDate.getMonth();
  };

  const nextDay = () => {
    setCurrentDate((prevDate) => addDays(prevDate, 1));
  };

  const prevDay = () => {
    setCurrentDate((prevDate) => subDays(prevDate, 1));
  };

  return { currentDate, currentMonth, nextMonth, prevMonth, nextDay, prevDay };
}
