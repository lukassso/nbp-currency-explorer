import { createContext, useContext, useState, ReactNode } from "react";
import { subDays } from "date-fns";
import { DateRange, DateRangeContextProps } from "@/types";

const DateRangeContext = createContext<DateRangeContextProps | undefined>(
  undefined
);

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
};

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const today = new Date();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(today, 30),
    to: today,
  });

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
};
