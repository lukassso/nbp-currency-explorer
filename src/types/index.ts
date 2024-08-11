// src/types/types.ts

export interface CurrencyRate {
  currency: string;
  code: string;
  mid: number;
}

export interface CurrencyTable {
  table: string;
  no: string;
  effectiveDate: string;
  rates: CurrencyRate[];
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
