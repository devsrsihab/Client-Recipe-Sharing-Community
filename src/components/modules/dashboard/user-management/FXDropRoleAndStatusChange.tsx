import {
  useChangeRoleMutation,
  useChangeStatusMutation,
} from "@/src/hooks/user.hook";
import { Select, SelectItem } from "@nextui-org/select";
import { Key } from "@react-types/shared";
import React from "react";

interface IProps {
  userId: string;
  menuItems: { key: string; value: string }[];
  label: string;
  defaultItem?: string;
  whichFor: string;
}

const FXDropRoleAndStatusChange = ({
  menuItems,
  label,
  userId,
  defaultItem, // Add defaultItem prop
  whichFor,
}: IProps) => {
  const { mutate: changeUserRole } = useChangeRoleMutation();
  const { mutate: changeUserStatus } = useChangeStatusMutation();

  // role update handler
  const handleRoleUpdate = (id: string, role: string) => {
    console.log(role, id);
    changeUserRole({ id, role });
  };
  // status update handler
  const handleStatusUpdate = (id: string, status: string) => {
    console.log(status, id);
    changeUserStatus({ id, status });
  };

  // change value handler
  const hanleSeletedValue = (value: string, id: string, whichFor: string) => {
    if (whichFor === "role") {
      handleRoleUpdate(id, value);
    } else {
      handleStatusUpdate(id, value);
    }
  };

  return (
    <div className="w-full z-10">
      <Select
        onSelectionChange={(value) =>
          hanleSeletedValue(value.currentKey as string, userId, whichFor)
        }
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

export default FXDropRoleAndStatusChange;
