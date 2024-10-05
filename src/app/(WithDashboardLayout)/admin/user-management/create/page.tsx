"use client";

import FXInput from "@/src/components/Form/FXInput";
import FXSelect from "@/src/components/Form/FXSelect";
import { USER_ROLE } from "@/src/constant";
import { useUser } from "@/src/context/user.provider";
import { useCreateUserMutation } from "@/src/hooks/user.hook";
import { userCreateSchema } from "@/src/schemas/user.schem";
import { IUser } from "@/src/types";
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

const CreateUserPage = () => {
  // define state
  const [imageFile, setImageFile] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const {
    mutate: createUser,
    isPending: userPending,
    isSuccess,
  } = useCreateUserMutation();

  const { user } = useUser();

  // define methods
  const methods = useForm({
    resolver: zodResolver(userCreateSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  // if the data suucessfully submit then reset the form
  useEffect(() => {
    if (isSuccess) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
      });
      setImageFile([]);
      setImagePreview([]);
    }
  }, [isSuccess, reset]);

  // form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl = "";
    if (imageFile.length > 0 && data.profilePicture) {
      imageUrl = await cloudinaryUpload(imageFile[0]);
    }
    const userData: Partial<IUser> = {
      ...data,
      name: { firstName: data.firstName, lastName: data.lastName },
      profilePicture: imageUrl || "",
    };

    createUser(userData);
  };

  // handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFile([...imageFile, file]);

    // if file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview([reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-20 py-12">
      <h1 className="text-2xl font-semibold">Create a new user</h1>
      <Divider className="my-5" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title and description */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="firstName" label="First Name" />
            </div>
            <div className="min-w-fit flex-1">
              <FXInput name="lastName" label="Last Name" />
            </div>
          </div>

          {/* prepTime and cookTime */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="email" label="Email" />
            </div>
            <div className="min-w-fit flex-1">
              <FXInput name="password" label="Password" />
            </div>
          </div>

          {/* instructions and description */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXSelect
                className="uppercase"
                options={USER_ROLE}
                name="role"
                label="Role"
                variant="bordered"
              />
            </div>
            <div className="min-w-fit flex-1"></div>
          </div>

          {/* image */}
          <div>
            <Divider className="mt-10" />
            <h2 className="text-2xl mt-5">Profile Picture</h2>
            <div className="flex flex-wrap gap-4 py-2">
              <div className="min-h-fit flex-1">
                {/* image preview div */}
                {imagePreview.length > 0 &&
                  imagePreview.map((image, index) => (
                    <div
                      className="relative w-full h-[200px] rounded-xl border-2 p-2 border-dashed border-default-100"
                      key={index}
                    >
                      <img
                        className="w-full h-full object-contain rounded-xl"
                        src={image}
                        alt=""
                      />
                    </div>
                  ))}
              </div>

              <div className="min-h-fit flex-1">
                <label
                  htmlFor="image"
                  className="bg-default-100 flex justify-center items-center h-[200px] w-full rounded-md p-4"
                >
                  <span>Upload Profile Image</span>
                </label>
                <input
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                  type="file"
                  name="profilePicture"
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
            Create
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateUserPage;
