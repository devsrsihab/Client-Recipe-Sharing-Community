import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Key } from "@react-types/shared";
import React, { useState } from "react";

const FXDropDown = ({
  menuItems,
  buttonLabel,
  getValueFunction,
  defaultItem, // Add defaultItem prop
}: {
  menuItems: string[];
  // eslint-disable-next-line no-unused-vars
  getValueFunction: (value: string) => void;
  buttonLabel: string;
  defaultItem?: string; // The default selected item
}) => {
  const [selectedKey, setSelectedKey] = useState<Key>(defaultItem as string); // Track the selected item

  const handleValueChange = (value: Key) => {
    setSelectedKey(value); // Update selected item
    getValueFunction(value.toString());
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">{buttonLabel}</Button>
        </DropdownTrigger>
        <DropdownMenu
          color="success"
          selectedKeys={[selectedKey]} // Set default selected key here
          onAction={(key: Key) => handleValueChange(key)}
          aria-label="Dynamic Actions"
          className="uppercase"
        >
          {menuItems.map((item) => (
            <DropdownItem key={item}>{item}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default FXDropDown;
