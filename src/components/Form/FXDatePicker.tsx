import { IInput } from "@/src/types";
import { DatePicker } from "@nextui-org/date-picker";
import { Controller } from "react-hook-form";

interface IDatePickerProps extends IInput {}

const FXDatePicker = ({ label, name }: IDatePickerProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { ...fields } }) => (
        <DatePicker
          label={label}
          className="min-w-full sm:min-w-[225px]"
          {...fields}
        />
      )}
    />
  );
};

export default FXDatePicker;
