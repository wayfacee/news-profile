import { type CurrencySymbol } from "@/entities/currency";

export const LS_BASE_CURRENCY_KEY = "baseCurrency";

// в api.exchangeratesapi.io вроде как ток евро разрешен
export const allowedCurrencyItems: CurrencySymbol[] = [
  { currency: "EUR", fullName: "Euro" },
];
