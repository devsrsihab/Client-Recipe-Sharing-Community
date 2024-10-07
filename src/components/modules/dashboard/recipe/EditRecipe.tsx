"use client";

import { PlusIcon, TrashIcon } from "@/src/assets/icons";
import FXInput from "@/src/components/Form/FXInput";
import FXSelect from "@/src/components/Form/FXSelect";
import FXTextArea from "@/src/components/Form/FXTextArea";
import { RECIPE_ISPAID_OPTIONS, RECIPE_STATUS_OPTIONS } from "@/src/constant";
import { useUser } from "@/src/context/user.provider";
import { useGetCategories } from "@/src/hooks/categories.hook";
import {
  useGetRecipeDetails,
  useUpdateRecipeMutation,
} from "@/src/hooks/recipe.hook";
import { updateRecipeSchema } from "@/src/schemas/recipe.schem";
import { IRecipe } from "@/src/types";
import cloudinaryUpload from "@/src/utils/cloudinaryUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import JoditEditor from "jodit-react";

const EditRecipe = ({ recipeId }: { recipeId: string }) => {
  // define state
  const [imageFile, setImageFile] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const {
    data: recipeSingleData,
    isLoading: isSingleRecipeLoading,
    isError: isSingleRecipeError,
  } = useGetRecipeDetails(recipeId);

  const reciepeSingle = recipeSingleData?.data;

  const {
    mutate: handleUpdateRecipe,
    isPending: recipePending,
    isSuccess: isCreateRecipeSuccess,
  } = useUpdateRecipeMutation();
  // get categories
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetCategories();

  const { user } = useUser();
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
  const formConfig: any = {};
  formConfig["resolver"] = zodResolver(updateRecipeSchema);

  const methods = useForm({
    ...formConfig,
  });

  // destructure methods needed object
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  // init usefieldarray obj
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const editor = useRef(null);
  const descriptionConfig = useMemo(
    () => ({
      theme: "default",
      minHeight: 200,
      maxHeight: 400,
      placeholder: "Use description to edit your recipe",
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
      placeholder: "Use instructions to edit your recipe",
      textColor: "#000000",
      style: {
        color: "#000000",
      },
    }),
    []
  );

  // form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl = recipeSingleData?.data?.image;
    if (imageFile && imageFile.length > 0) {
      imageUrl = await cloudinaryUpload(imageFile[0]);
    }
    const recipeData: Partial<IRecipe> = {
      ...data,
      prepTime: Number(data.prepTime),
      cookTime: Number(data.cookTime),
      isPaid: data.isPaid === "true" ? true : false,
      image: imageUrl || "",
    };

    // Replace createRecipe with updateRecipe (you'll need to create this mutation)
    handleUpdateRecipe({ id: recipeId, data: recipeData });
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

  useEffect(() => {
    if (recipeSingleData?.data) {
      const recipe = recipeSingleData.data;

      methods.setValue("category", recipe?.category?._id || "");
      methods.setValue("title", recipe.title);
      methods.setValue("category", recipe?.category?._id || "");
      methods.setValue("isPaid", String(recipe?.isPaid));
      methods.setValue("status", recipe?.status);
      methods.setValue("prepTime", recipe.prepTime);
      methods.setValue("cookTime", recipe.cookTime);
      methods.setValue("instructions", recipe.instructions);
      methods.setValue("description", recipe.description);
      methods.setValue("ingredients", recipe.ingredients);
      setImagePreview(recipe.image ? [recipe.image] : []);
    }
  }, [recipeSingleData, methods]);

  // loading state
  if (isSingleRecipeLoading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  // is erro r
  if (isSingleRecipeError) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 text-xl mt-10">
        Error loading recipe.
      </div>
    );
  }

  return (
    <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-20 py-12">
      <h1 className="text-2xl font-semibold">Update Recipe</h1>
      <Divider className="my-5" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title and description */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput
                defaultValue={reciepeSingle?.title}
                name="title"
                label="Title"
              />
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

          {/* status and ispain */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXSelect
                options={RECIPE_ISPAID_OPTIONS}
                name="isPaid"
                label="Is Paid"
                variant="bordered"
              />
            </div>
            <div className="min-w-fit flex-1">
              <FXSelect
                options={RECIPE_STATUS_OPTIONS}
                defaultValue={reciepeSingle?.isPaid}
                name="status"
                label="Status"
                variant="bordered"
              />
            </div>
          </div>

          {/* prepTime and cookTime */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
              <FXInput
                defaultValue={reciepeSingle?.prepTime}
                name="prepTime"
                label="Prep Time"
              />
            </div>
            <div className="min-w-fit flex-1">
              <FXInput
                defaultValue={reciepeSingle?.cookTime}
                name="cookTime"
                label="Cook Time"
              />
            </div>
          </div>

          {/* instructions and description */}
          <div className="flex flex-wrap gap-4 py-2">
            <div className="min-w-fit flex-1">
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
                      value={field.value as string}
                      onChange={(newContent) => {
                        field.onChange(newContent);
                      }}
                      config={descriptionConfig}
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
            Update
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditRecipe;
