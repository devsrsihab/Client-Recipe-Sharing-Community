import { IInput } from "@/src/types";
import { Radio, RadioGroup } from "@headlessui/react";
import { useFormContext, useController } from "react-hook-form";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
  className?: string;
}

const FXRadio = ({ name, label, options, defaultValue }: IProps) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <>
      {label && <label>{label}</label>}
      <RadioGroup
        {...field}
        defaultValue={field.value ? [field.value] : ""}
        className={`max-w-xs ${errorMessage ? "invalid-class" : ""}`}
      >
        {options.map((option) => (
          <Radio key={option.key} value={option.key}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
};

export default FXRadio;
