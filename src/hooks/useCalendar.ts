import { useState } from "react";
import {
  addMonths,
  subMonths,
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  isSameDay,
} from "date-fns";

export function useCalendar() {
  // STATE
  const [currentDate, setCurrentDate] = useState(
    new Date().setHours(0, 0, 0, 0)
  );

  // UPDATING FUNCTIONS
  const nextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const setTimeOnCurrentDate = (hours: number, minutes: number) => {
    setCurrentDate((prevDate) =>
      new Date(prevDate).setHours(hours, minutes, 0, 0)
    );
  };

  // GETTERS

  const getCurrentMonthName = (): string => {
    return format(currentDate, "MMMM");
  };

  const getCurrentMonthDays = (): Date[] => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    return eachDayOfInterval({
      start: monthStart,
      end: monthEnd,
    });
  };

  const getFirstDayOfTheWeek = (date: Date): Date => {
    return startOfWeek(date, { weekStartsOn: 1 });
  };

  const getFormattedDate = (date: Date, dateFormat: string): string => {
    return format(date, dateFormat);
  };

  // BOOLEAN CHECKS
  const areDatesSameDay = (date1: Date, date2: Date): boolean => {
    return isSameDay(date1, date2);
  };

  return {
    currentDate,
    setCurrentDate,
    nextMonth,
    prevMonth,
    setTimeOnCurrentDate,
    getCurrentMonthName,
    getCurrentMonthDays,
    getFirstDayOfTheWeek,
    getFormattedDate,
    areDatesSameDay,
  };
}
