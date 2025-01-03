import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";

interface Props {
  amount: number;
  setAmount: (value: number) => void;
}

export const CalculatorInput = ({ amount, setAmount }: Props) => (
  <div>
    <Label htmlFor="curr">Поле ввода суммы</Label>
    <Input
      id="curr"
      type="number"
      min={1}
      value={amount}
      onChange={(e) => setAmount(Number(e.target.value))}
    />
  </div>
);