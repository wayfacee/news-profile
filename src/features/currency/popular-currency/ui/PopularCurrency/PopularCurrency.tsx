import {
  CurrencySelect,
  type CurrencySymbol,
  useCurrencyQuery,
} from "@/entities/currency";
import { allowedCurrencyItems, LS_BASE_CURRENCY_KEY } from "@/shared/const";
import { getFromLS } from "@/shared/helpers/manageLocalStorage";
import { cn } from "@/shared/lib";
import { Label } from "@/shared/ui/Label";

interface Props {
  className?: string;
}

export const PopularCurrency = ({ className }: Props) => {
  const baseCurrency = getFromLS(LS_BASE_CURRENCY_KEY) || "EUR";
  const { data, isLoading, refetch } = useCurrencyQuery({
    base: baseCurrency,
    symbols: ["USD", "GBP", "JPY"],
  });

  const onSetCurrency = (currency: CurrencySymbol["currency"]) => {
    localStorage.setItem(LS_BASE_CURRENCY_KEY, currency);
    refetch(); // обновляем данные
  };

  if (isLoading) return "Loading...";

  return (
    <div className={cn("text-center flex flex-col gap-7", className)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="currency-select">Выберите любимую валюту</Label>
        <CurrencySelect
          defaultValue={baseCurrency}
          callback={onSetCurrency}
          items={allowedCurrencyItems}
          placeholder="Выберите любимую валюту"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="mb-5 font-semibold text-xl">Популярные валюты</h1>
        <ol>
          {data ? (
            data.map(({ currency, cost }, index) => (
              <li className="mb-2 text-lg" key={currency}>
                {index + 1}. {currency}: {Math.round(cost)}
              </li>
            ))
          ) : (
            <p>Данные о популярных валютах отсутствуют</p>
          )}
        </ol>
      </div>
    </div>
  );
};
