"use client";

import { useDeleteComment } from "@/src/hooks/comment.hook";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

export default function CommentDeleteModal({
  commentId,
  buttonContent,
}: {
  commentId?: string;
  buttonContent?: React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteComment, isPending: deleteCommentLoading } =
    useDeleteComment();

  // handle delete recipe
  const handleDeleteUser = (id: string) => {
    deleteComment(id);
  };

  return (
    <>
      <Button color="danger" isIconOnly={!!buttonContent} onPress={onOpen}>
        {buttonContent}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Comment
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this comment?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => handleDeleteUser(commentId as string)}
                  color="danger"
                  onPress={onClose}
                  isLoading={deleteCommentLoading}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
