"use client";
import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";

interface IProps extends IInput {
  isDisabled?: boolean;
}

const FXInput = ({
  variant = "bordered",
  size = "lg",
  required = false,
  type = "text",
  name,
  label,
  defaultValue,
  isDisabled = false,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  // set watch
  const currentValue = useWatch({ name, defaultValue });
  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      type={type}
      required={required}
      variant={variant}
      size={size}
      name={name}
      label={label}
      value={currentValue || ""}
      isDisabled={isDisabled}
    />
  );
};

export default FXInput;
