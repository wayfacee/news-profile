import { CalculatorCurrency } from "@/features/currency/calculator-currency";
import { PopularCurrency } from "@/features/currency/popular-currency";

const CurrencyPage = () => {
  return (
    <div className="flex flex-row gap-36 mt-10">
      <PopularCurrency />
      <CalculatorCurrency />
    </div>
  );
};

export default CurrencyPage;