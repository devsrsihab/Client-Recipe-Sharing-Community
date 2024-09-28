"use client";

import { PlusIcon, TrashIcon } from "@/src/assets/icons";
import FXDatePicker from "@/src/components/Form/FXDatePicker";
import FXInput from "@/src/components/Form/FXInput";
import FXSelect from "@/src/components/Form/FXSelect";
import FXTextArea from "@/src/components/Form/FXTextArea";
import { useUser } from "@/src/context/user.provider";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { useCreatePostMutation } from "@/src/hooks/post.hook";
import generateDescription from "@/src/services/GenerateDescription";
import { IFormData } from "@/src/types";
import dateToISO from "@/src/utils/dateToIso";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";
import { PiListStarThin } from "react-icons/pi";
import { GrPowerReset } from "react-icons/gr";

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

const Page = () => {
  // define state
  const [imageFile, setImageFile] = useState<File[] | []>([]);
  const [loadingDesc, setLoadingDesc] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const { mutate: createPost, isPending: postPending } =
    useCreatePostMutation();
  const { user } = useUser();
  // get categories
  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();
  // define option let
  let categorieOptions: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categorieOptions = categoriesData?.data?.map(
      (category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      })
    );
  }

  // define methods
  const methods = useForm();

  // destructure methods needed object
  const { control, handleSubmit } = methods;

  // init usefieldarray obj
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  // all city options
  const cityOptions = allDistict()
    .sort()
    .map((city: string) => ({ key: city, label: city }));

  // form submit handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData: IFormData = {
      ...data,
      title: data.title,
      location: data.location,
      city: data.city,
      category: data.category,
      description: data.description,
      questions: data.questions.map(
        (question: { value: string }) => question.value
      ),
      dateFound: dateToISO(data.foundDate),
      user: user?._id as string,
      itemImages: data.itemImages,
    };

    formData.append("data", JSON.stringify(postData));

    for (const image of imageFile) {
      formData.append("itemImages", image);
    }

    createPost(formData);
  };

  // handle field array append
  const handleFieldAppent = () => {
    append({ name: "questions" });
  };

  // handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFile([...imageFile, file]);

    // if file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview([...imagePreview, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  // handle desccription generation
const handleDescriptionGeneration = async () => {
  setLoadingDesc(true);
  try {
    if (imagePreview[0]) {
      const prompt = "make a description of this image. this is lost item from foundx website. make description like this easy and user can read it easily. make response with good emoji";
      const res = await generateDescription(imagePreview[0], prompt);

      let currentIndex = 0;
      const typingSpeed = 10; // Speed of typing in ms
      methods.setValue("description", ""); // Clear the description field

      const typeDescription = () => {
        if (currentIndex < res.length) {
          // Ensure res[currentIndex] is defined
          const char = res[currentIndex] ?? '';  // Default to empty string if undefined
          methods.setValue("description", (prev: string) => prev + char);
          currentIndex++;
        } else {
          // Stop typing when finished
          clearInterval(typingInterval);
          setLoadingDesc(false);
        }
      };

      const typingInterval = setInterval(typeDescription, typingSpeed);
    }
  } catch (error: any) {
    console.log(error?.message);
    setLoadingDesc(false);
  }
};



  return (
    <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-20 py-12">
      <h1 className="text-2xl font-semibold">Post a found item</h1>
      <Divider className="my-5" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title and found date */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="title" label="Title" />
            </div>
            <div className="min-w-fit flex-1">
              <FXDatePicker name="foundDate" label="Found Date" />
            </div>
          </div>
          {/* location and city */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="location" label="Location" />
            </div>
            <div className="min-w-fit flex-1">
              <FXSelect options={cityOptions} name="city" label="City" />
            </div>
          </div>
          {/* location and city */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXSelect
                disabled={!categorySuccess}
                options={categorieOptions}
                name="category"
                label="Category"
                variant="bordered"
              />
            </div>
            <div className="min-w-fit flex-1">
              <label
                className="bg-default-100 block w-full h-full rounded-md p-4"
                htmlFor="image"
              >
                Upload Image
              </label>
              <input
                onChange={(e) => handleImageChange(e)}
                multiple
                className="hidden"
                type="file"
                name="image"
                id="image"
              />
            </div>
          </div>

          {/* image preview div */}
          <div className="flex flex-wrap gap-3 my-3">
            {imagePreview.length > 0 &&
              imagePreview.map((image, index) => (
                <div
                  className="relative size-48 rounded-xl border-2 p-2 border-dashed border-default-100"
                  key={index}
                >
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={image}
                    alt=""
                  />
                </div>
              ))}
          </div>

          <div className="text-right" >
            <FXTextArea name="description" label="Description" />
 
            <div className="flex items-center justify-end mt-3 gap-3">
              {
                methods.getValues("description") && (
                  <Button   onClick={() => methods.setValue("description", "")} > <GrPowerReset  className="text-xl" /> Reset</Button>
                )
              }
               <Button isDisabled={imagePreview.length === 0} isLoading={loadingDesc} title="Generate"   onClick={handleDescriptionGeneration}> <PiListStarThin className="text-xl" /> Generate </Button>
            </div>
          </div>

          <Divider className="my-5" />
          <div className="flex justify-between items-center">
            <h2 className="text-2xl ">Owner Verification Questions</h2>
            <Button
              isIconOnly
              onClick={() => handleFieldAppent()}
              radius="none"
              className="p-1"
            >
              <PlusIcon />
            </Button>
          </div>

          {/* field loopt */}
          <div className="space-y-3 my-5">
            {fields.map((field, index) => (
              <div className="flex gap-3 items-center" key={field.id}>
                <FXInput name={`questions.${index}.value`} label="Question" />
                <Button
                  isIconOnly
                  onClick={() => remove(index)}
                  className="bg-red-500 p-2"
                  radius="none"
                >
                  <TrashIcon />
                </Button>
              </div>
            ))}
          </div>

          <Button
            isLoading={postPending}
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

export default Page;
