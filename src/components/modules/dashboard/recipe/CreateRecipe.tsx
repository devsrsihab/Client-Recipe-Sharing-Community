"use client";

import { PlusIcon, TrashIcon } from "@/src/assets/icons";
import FXInput from "@/src/components/Form/FXInput";
import FXSelect from "@/src/components/Form/FXSelect";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { useCreateRecipeMutation } from "@/src/hooks/recipe.hook";
import { createRecipeSchema } from "@/src/schemas/recipe.schem";
import { IRecipe } from "@/src/types";
import cloudinaryUpload from "@/src/utils/cloudinaryUpload";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
  Controller,
} from "react-hook-form";
import JoditEditor from "jodit-react";

type FormValues = {
  ingredients: Array<{ name: string; quantity: string }>;
  description: string;
  instructions: string;
};

function CreateRecipe() {
  // define state
  const editor = useRef(null);
  const desctiptionConfig = useMemo(
    () => ({
      theme: "default",
      minHeight: 200,
      maxHeight: 400,
      placeholder: "Use description to create your recipe",
      textColor: "#000000",
      style: {
        color: "#000000",
      },
    }),
    []
  );
  const instructionsConfig = useMemo(
    () => ({
      theme: "default",
      minHeight: 200,
      maxHeight: 400,
      placeholder: "Use instructions to create your recipe",
      textColor: "#000000",
      style: {
        color: "#000000",
      },
    }),
    []
  );
  const [imageFile, setImageFile] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const {
    mutate: createRecipe,
    isPending: recipePending,
    isSuccess,
  } = useCreateRecipeMutation();
  // get categories
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetCategories();

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
  const methods = useForm<FormValues>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      ingredients: [{ name: "", quantity: "" }],
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  // init usefieldarray obj
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  // if the data suucessfully submit then reset the form
  useEffect(() => {
    if (isSuccess) {
      reset({
        ingredients: [{ name: "", quantity: "" }],
      });
      setImageFile([]);
      setImagePreview([]);
    }
  }, [isSuccess, reset]);

  // form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl = "";

    if (imagePreview.length > 0) {
      imageUrl = await cloudinaryUpload(imageFile[0]);
    }
    const recipeData: Partial<IRecipe> = {
      ...data,
      title: data.title,
      prepTime: Number(data.prepTime),
      cookTime: Number(data.cookTime),
      category: data.category,
      description: data.description,
      ingredients: data.ingredients.map(
        (question: { name: string; quantity: string }) => ({
          name: question.name,
          quantity: question.quantity,
        })
      ),
      image: imageUrl || "",
    };

    createRecipe(recipeData);
    console.log(recipeData);
  };

  // handle field array append
  const handleFieldAppent = () => {
    append({ name: "", quantity: "" });
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
      <h1 className="text-2xl font-semibold">Create a new recipe</h1>
      <Divider className="my-5" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title and description */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="title" label="Title" />
            </div>
            <div className="min-w-fit flex-1">
              <FXSelect
                options={categorieOptions}
                disabled={categoryLoading}
                name="category"
                label="Category"
                variant="bordered"
              />
            </div>
          </div>

          {/* prepTime and cookTime */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="prepTime" type="number" label="Prep Time" />
            </div>
            <div className="min-w-fit flex-1">
              <FXInput name="cookTime" type="number" label="Cook Time" />
            </div>
          </div>

          {/* instructions and description */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              {/* <FXTextArea name="instructions" label="Instructions" /> */}
              <Controller
                name="instructions"
                control={control}
                render={({ field }) => (
                  <>
                    <label className="mb-3" htmlFor="instructions">
                      Instructions
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={field.value as string}
                      onChange={(newContent) => {
                        field.onChange(newContent);
                      }}
                      config={instructionsConfig}
                    />
                    {errors.instructions && (
                      <span className="text-red-500">
                        {errors.instructions.message as string}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="min-w-fit flex-1">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <>
                    <label className="mb-3" htmlFor="description">
                      Description
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={field.value}
                      onChange={(newContent) => {
                        field.onChange(newContent);
                      }}
                      config={desctiptionConfig}
                    />
                    {errors.description && (
                      <span className="text-red-500">
                        {errors.description.message as string}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          {/* ingredients list */}
          <Divider className="my-5" />
          <div className="flex justify-between items-center">
            <h2 className="text-2xl ">Ingredients List</h2>
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
                <FXInput name={`ingredients.${index}.name`} label="Name" />
                <FXInput
                  name={`ingredients.${index}.quantity`}
                  label="Quantity"
                />
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

          {/* image */}
          <div>
            <Divider className="mt-10" />
            <h2 className="text-2xl mt-5">Image</h2>
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
            isLoading={recipePending}
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
}

export default CreateRecipe;
