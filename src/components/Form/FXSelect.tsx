import { IInput } from "@/src/types";
import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext, useController } from "react-hook-form";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
  className?: string;
}

const FXSelect = ({
  name,
  label,
  variant,
  options,
  disabled,
  defaultValue,
  className,
}: IProps) => {
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
    <Select
      {...field}
      variant={variant}
      isDisabled={disabled}
      label={label}
      selectedKeys={field.value ? [field.value] : []}
      errorMessage={errorMessage}
      isInvalid={errorMessage ? true : false}
      placeholder={label}
      className="max-w-xs"
      onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
    >
      {options.map((option) => (
        <SelectItem className={className} key={option.key} value={option.key}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FXSelect;
