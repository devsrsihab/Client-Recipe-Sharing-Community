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
  defaultValue,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Watch the current value of the textarea field
  const currentValue = useWatch({ name, defaultValue });

  return (
    <Textarea
      {...register(name)}
      errorMessage={"Field is required"}
      isInvalid={!!errors[name]}
      minRows={6}
      required={required}
      variant={variant}
      size={size}
      name={name}
      label={label}
      value={currentValue || ""} // Use the watched value or empty string
    />
  );
};

export default FXTextArea;
