import { Select, SelectItem } from "@nextui-org/select";
import { Key } from "@react-types/shared";
import React from "react";

const FXDropSelector = ({
  menuItems,
  label,
  getValueFunction,
  defaultItem, // Add defaultItem prop
}: {
  menuItems: { key: string; value: string }[];
  getValueFunction: (value: string) => void;
  label: string;
  defaultItem?: string; // The default selected item
}) => {
  const handleValueChange = (value: Key) => {
    getValueFunction(value.toString());
  };

  return (
    <div className="w-full z-10">
      <Select
        onSelectionChange={(value) => handleValueChange(value as Key)}
        label={label}
        placeholder="Select a Value"
        className="min-w-[120px]"
        defaultSelectedKeys={[defaultItem as Key]}
      >
        {menuItems.map((item) => (
          <SelectItem key={item.key} value={item.key} className="uppercase">
            {item.value}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default FXDropSelector;
