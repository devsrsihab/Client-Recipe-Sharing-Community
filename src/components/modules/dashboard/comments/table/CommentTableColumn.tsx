"use client";

import { IComment } from "@/src/types";
import { TrashIcon } from "@heroicons/react/20/solid";
import FXCommentStatusChange from "../FXCommentStatusChange";
import CommentDeleteModal from "@/src/components/modal/CommentDeleteModal";

export const commentRenderCell = (comment: IComment, columnKey: React.Key) => {
  const cellValue = comment[columnKey as keyof IComment];

  const commentStatus = [
    { key: "pending", value: "pending" },
    { key: "approved", value: "approved" },
    { key: "rejected", value: "rejected" },
  ];

  switch (columnKey) {
    case "name":
      return (
        <>
          <span className="capitalize">
            {comment.user.name.firstName} {comment.user.name.lastName}
          </span>
        </>
      );

    case "comment":
      return (
        <div className="max-w-[240px]">
          {" "}
          {[...(cellValue as any)].slice(0, 130).concat("...")}
        </div>
      );

    case "recipe":
      return (
        <>
          <span className="capitalize">{comment.recipe.title}</span>
        </>
      );

    case "status":
      return (
        <>
          <FXCommentStatusChange
            menuItems={commentStatus}
            defaultItem={cellValue as string}
            label="change A Status"
            commentId={comment._id}
          />
        </>
      );

    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <span className="cursor-pointer text-lg text-danger active:opacity-50">
            <CommentDeleteModal
              buttonContent={<TrashIcon className="size-5" />}
              commentId={comment?._id}
            />
          </span>
        </div>
      );
    default:
      return cellValue;
  }
};
