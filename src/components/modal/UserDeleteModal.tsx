"use client";

import { useDeleteUserByIdMutation } from "@/src/hooks/user.hook";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { ReactNode } from "react";

export default function UserDeleteModal({
  recipeid,
  buttonContent,
}: {
  recipeid?: string;
  buttonContent?: ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteUser, isPending: deleteRecipeLoading } =
    useDeleteUserByIdMutation();

  // handle delete recipe
  const handleDeleteUser = (id: string) => {
    deleteUser(id);
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
                Delete User
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this user?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => handleDeleteUser(recipeid as string)}
                  color="danger"
                  onPress={onClose}
                  isLoading={deleteRecipeLoading}
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
