"use client";

import FXInput from "@/src/components/Form/FXInput";
import { useUser } from "@/src/context/user.provider";
import { useGetUserById } from "@/src/hooks/user.hook";
import { useUpdateUserProfileMutation } from "@/src/hooks/userProfile.hook";
import { updateUserSchema } from "@/src/schemas/user.schem";
import { IUser } from "@/src/types/post.type";

import cloudinaryUpload from "@/src/utils/cloudinaryUpload";
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

const EditProfilePage = () => {
  // current user
  const { user: currentUser } = useUser();

  // define state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    data: userSingleData,
    isLoading: isSingleUserLoading,
    isError: isSingleUserError,
  } = useGetUserById(currentUser?._id as string);

  const userSingle = userSingleData?.data;

  const { mutate: handleUpdateUser, isPending: userPending } =
    useUpdateUserProfileMutation();

  // define methods
  const methods = useForm({
    resolver: zodResolver(updateUserSchema),
  });

  // destructure methods needed object
  const { handleSubmit } = methods;

  // form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    let profilePictureUrl = userSingle?.profilePicture;
    if (imageFile) {
      profilePictureUrl = await cloudinaryUpload(imageFile);
    }

    const userData: Partial<IUser> = {
      name: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      profilePicture: profilePictureUrl || "",
    };
    console.log(userData);

    handleUpdateUser(userData);
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
              <FXInput isDisabled={true} name="email" label="Email" />
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

export default EditProfilePage;
