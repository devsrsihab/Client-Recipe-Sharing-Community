"use client";
import { ReactNode, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface IFormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface IProps extends IFormConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  isReset?: boolean;
}

const FXForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
  isReset = false,
}: IProps) => {
  // form config
  const formConfig: IFormConfig = {};
  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  // form reset after submit
  useEffect(() => {
    if (isReset) {
      methods.reset();
    }
  }, [isReset]);

  const handleSubmit = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}> {children} </form>
    </FormProvider>
  );
};

export default FXForm;
