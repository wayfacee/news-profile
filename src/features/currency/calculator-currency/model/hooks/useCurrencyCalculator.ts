import {
  type CurrencySymbol,
  useLazyCurrencyQuery,
  useSymbolsQuery,
} from "@/entities/currency";
import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface ReturnProps {
  symbols?: CurrencySymbol[]; // USD EUR RUB
  amount: number;
  totalCost: number;
  searchParams: URLSearchParams;
  setAmount: (amount: number) => void;
  onSelectItem: (
    currency: CurrencySymbol["currency"],
    conversion: "from" | "to",
  ) => void;
  onCalculate: () => void;
}

export const useCurrencyCalculator = (): ReturnProps => {
  const { data: symbols } = useSymbolsQuery();
  const [getCurrencyPrice] = useLazyCurrencyQuery();

  const [amount, setAmount] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  // functions
  const onCalculate = useCallback(async () => {
    const base = searchParams.get("from") || "EUR";
    const to = searchParams.get("to") || "USD";

    try {
      const { data: currencyPrice } = await getCurrencyPrice({
        base,
        symbols: to,
      });

      if (currencyPrice) setTotalCost(currencyPrice[0].cost * amount);
    } catch (error) {
      console.error("Ошибка при получении курса валют:", error);
    }
  }, [amount, getCurrencyPrice, searchParams]);

  const onSelectItem = useCallback(
    (currency: CurrencySymbol["currency"], conversion: "from" | "to") => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(conversion, currency);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );
  // -----

  return {
    symbols,
    amount,
    totalCost,
    searchParams,
    setAmount,
    onSelectItem,
    onCalculate,
  };
};
