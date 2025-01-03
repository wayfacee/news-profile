export interface CurrencyApiResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: Date;
  rates: {
    [currency: string]: number;
  };
}

export interface CurrencyRequest {
  base: string;
  symbols: string[] | string;
}

export interface Currency {
  currency: string;
  cost: number;
}

// Symbols (USD, EUR, RUB)
export interface SymbolApiResponse {
  success: boolean;
  symbols: {
    [currency: string]: string;
  };
}

export interface CurrencySymbol {
  currency: string;
  fullName: string;
}
