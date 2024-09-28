"use client";
import { IInput } from "@/src/types";
import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";

interface IProps extends IInput {}

const FXTextArea = ({
  variant = "bordered",
  size = "lg",
  required = false,
  name,
  label,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({name})

  return (
    <Textarea
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      minRows={6}
      required={required}
      variant={variant}
      size={size}
      name={name}
      label={label}
      value={currentValue || ""}
    />
  );
};

export default FXTextArea;
