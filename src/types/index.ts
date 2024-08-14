export interface CurrencyRate {
  currency: string;
  code: string;
  mid: number;
}

export interface CurrencyDetailRate {
  no: string;
  effectiveDate: string;
  mid: number;
}

export interface CurrencyDetails {
  table: string;
  currency: string;
  code: string;
  rates: CurrencyDetailRate[];
}

export interface ChartDataPoint {
  effectiveDate: string;
  mid: number;
}

export interface ChartComponentProps {
  data: ChartDataPoint[];
}

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export interface DateRangeContextProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}
