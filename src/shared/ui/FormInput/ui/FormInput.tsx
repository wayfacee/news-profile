import React from "react";
import { Input } from "../../Input/ui/Input";
import { useFormContext } from "react-hook-form";
import { RequiredSymbol } from "../../RequiredSymbol/ui/RequiredSymbol";
import { ClearButton } from "../../ClearButton/ui/ClearButton";
import { ErrorText } from "../../ErrorText/ui/ErrorText";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register, // позволяет зарегать наш инпут, в рамках рхф
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", {
      shouldValidate: true, // когда будем очищать, будет вызыв. валидация
    });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2 text-sm">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-9" {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
