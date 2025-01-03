import { CurrencySelect } from "@/entities/currency";
import { allowedCurrencyItems } from "@/shared/const";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { useCurrencyCalculator } from "../../model/hooks/useCurrencyCalculator";
import { CalculatorInput } from "../CalculatorInput/CalculatorInput";

interface Props {
  className?: string;
}

export const CalculatorCurrency = ({ className }: Props) => {
  const {
    symbols,
    amount,
    totalCost,
    searchParams,
    setAmount,
    onSelectItem,
    onCalculate,
  } = useCurrencyCalculator();

  return (
    <div className={cn("flex flex-col gap-4 text-center", className)}>
      <h1 className="text-xl font-bold mb-5">Калькулятор валюты</h1>
      <h1 className="text-xl font-bold mb-3">
        Amount: <span className="text-red-400">{totalCost}</span>
      </h1>

      <CalculatorInput amount={amount} setAmount={setAmount} />

      <CurrencySelect
        items={allowedCurrencyItems}
        defaultValue={searchParams.get("from") || "EUR"}
        callback={(currency) => onSelectItem(currency, "from")}
        placeholder="Исходная валюта"
      />

      <CurrencySelect
        items={symbols}
        defaultValue={searchParams.get("to") || "USD"}
        callback={(currency) => onSelectItem(currency, "to")}
        placeholder="Целевая валюта"
      />

      <Button onClick={onCalculate}>Расчитать</Button>
    </div>
  );
};
