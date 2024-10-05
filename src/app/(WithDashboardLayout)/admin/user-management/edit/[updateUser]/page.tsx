"use client";

import FXInput from "@/src/components/Form/FXInput";
import FXSelect from "@/src/components/Form/FXSelect";
import {
  useGetUserById,
  useUpdateUserByIdMutation,
} from "@/src/hooks/user.hook";
import { updateUserSchema } from "@/src/schemas/user.schem";

import { IUser } from "@/src/types";
import cloudinaryUpload from "@/src/utils/cloudinaryUpload";
import { Radio, RadioGroup } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const UserUpdate = ({ params }: { params: { updateUser: string } }) => {
  const { updateUser } = params;

  // define state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    data: userSingleData,
    isLoading: isSingleUserLoading,
    isError: isSingleUserError,
  } = useGetUserById(updateUser as string);

  const userSingle = userSingleData?.data;

  const {
    mutate: handleUpdateUser,
    isPending: userPending,
    isSuccess: isUpdateUserSuccess,
  } = useUpdateUserByIdMutation();

  // define methods
  const methods = useForm({
    resolver: zodResolver(updateUserSchema),
  });

  // destructure methods needed object
  const { handleSubmit } = methods;

  // form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    let profilePictureUrl = userSingle?.profilePicture;
    if (imageFile) {
      profilePictureUrl = await cloudinaryUpload(imageFile);
    }

    console.log(data);
    
    const userData: Partial<IUser> = {
      name: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      email: data.email,
      role: data.role,
      status: data.status,
      isPremium: data.isPremium === "true" ? true : false,
      profilePicture: profilePictureUrl || "",
    };

    console.log("Submitting userData:", userData); // Add this log
    handleUpdateUser({ id: updateUser, data: userData });
  };

  // handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (userSingle) {
      methods.setValue("firstName", userSingle.name.firstName);
      methods.setValue("lastName", userSingle.name.lastName);
      methods.setValue("email", userSingle.email);
      methods.setValue("role", userSingle.role);
      methods.setValue("status", userSingle.status);
      methods.setValue("isPremium", String(userSingle.isPremium));
      setImagePreview(userSingle.profilePicture || null);
    }
  }, [userSingle, methods]);

  // loading state
  if (isSingleUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  // is error
  if (isSingleUserError) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 text-xl mt-10">
        Error loading user.
      </div>
    );
  }

  const roleOptions = [
    { key: "user", label: "User" },
    { key: "admin", label: "Admin" },
  ];

  const statusOptions = [
    { key: "active", label: "Active" },
    { key: "pending", label: "Pending" },
    { key: "blocked", label: "Blocked" },
  ];

  // user is premium
  const isPremiumOptions = [
    {key: "true", label: "Yes"},
    {key: "false", label: "No"},
  ];

  return (
    <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-20 py-12">
      <h1 className="text-2xl font-semibold">Update User</h1>
      <Divider className="my-5" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* firstName and lastName */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="firstName" label="First Name" />
            </div>
            <div className="min-w-fit flex-1">
              <FXInput name="lastName" label="Last Name" />
            </div>
          </div>

          {/* email and role */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="email" label="Email" />
            </div>
            <div className="min-w-fit flex-1">
              <FXSelect
                options={roleOptions}
                name="role"
                label="Role"
                variant="bordered"
              />
            </div>
          </div>

          {/* status and isPremium */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXSelect
                options={statusOptions}
                name="status"
                label="Status"
                variant="bordered"
              />
            </div>
            <div className="min-w-fit flex-1">
               <FXSelect
                options={isPremiumOptions}
                name="isPremium"
                label="Is Premium"
                variant="bordered"
              />
            </div>
          </div>

          {/* profile picture */}
          <div>
            <Divider className="mt-10" />
            <h2 className="text-2xl mt-5">Profile Picture</h2>
            <div className="flex flex-wrap gap-4 py-2">
              <div className="min-h-fit flex-1">
                {/* image preview div */}
                {imagePreview && (
                  <div className="relative w-full h-[200px] rounded-xl border-2 p-2 border-dashed border-default-100">
                    <img
                      className="w-full h-full object-contain rounded-xl"
                      src={imagePreview}
                      alt=""
                    />
                  </div>
                )}
              </div>

              <div className="min-h-fit flex-1">
                <label
                  htmlFor="image"
                  className="bg-default-100 flex justify-center items-center h-[200px] w-full rounded-md p-4"
                >
                  <span>Upload Image</span>
                </label>
                <input
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                  type="file"
                  name="image"
                  id="image"
                />
              </div>
            </div>
          </div>

          <Button
            isLoading={userPending}
            className="mt-5"
            radius="none"
            type="submit"
          >
            Update
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UserUpdate;
