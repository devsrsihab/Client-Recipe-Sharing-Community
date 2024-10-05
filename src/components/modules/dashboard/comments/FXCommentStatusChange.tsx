import { useUpdateCommentStatus } from "@/src/hooks/comment.hook";
import { Select, SelectItem } from "@nextui-org/select";
import { Key } from "@react-types/shared";
import React from "react";

interface IProps {
  commentId: string;
  menuItems: { key: string; value: string }[];
  label: string;
  defaultItem?: string;
}

const FXCommentStatusChange = ({
  menuItems,
  label,
  commentId,
  defaultItem, // Add defaultItem prop
}: IProps) => {
  const { mutate: changeCommentStatus } = useUpdateCommentStatus();

  // role update handler
  const handleRoleUpdate = (id: string, status: string) => {
    changeCommentStatus({ id, status });
  };

  return (
    <div className="w-full z-10">
      <Select
        onSelectionChange={(value) =>
          handleRoleUpdate(commentId, value.currentKey as string)
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

export default FXCommentStatusChange;
