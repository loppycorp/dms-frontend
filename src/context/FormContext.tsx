"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { boolean } from "zod";

export interface FormValues {
  [key: string]: any;
}

export interface FieldValue {
  [key: string]: any;
}

export interface InputProps {
  componentName: string;
}

export type FormContextType = {
  formValues: FormValues;
  value: (valueProps: InputProps | undefined) => any;
  setValue: (valueProps: InputProps | undefined, value: any) => void;
  duplicateValues: (index: number) => void;
  createEmptyValues: () => void;
  getData: () => any;
  isDataLoaded: boolean;
};

const FormContext = createContext<FormContextType>({
  formValues: {},
  value: () => null,
  setValue: () => {},
  duplicateValues: () => {},
  createEmptyValues: () => {},
  getData: () => null,
  isDataLoaded: false,
});

export const FormProvider = (props: {
  children: React.ReactNode;
  page: PageItem;
}) => {
  const [formValues, setFormValues] = useState<FormValues>(emptyValues);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const params = useSearchParams()?.get("item");

  useEffect(() => {
    const generatedData = props.page.generated_data as any;

    if (generatedData && params) {
      const index = generatedData.findIndex((item: any) => {
        return item._id === params;
      });
      assignValues(index);
    }
  }, [params]);

  function value(inputProps?: InputProps) {
    if (!inputProps) return;
    console.log(formValues[inputProps.componentName]);
    return formValues[inputProps.componentName];
  }

  function sanitizeForm(fields: any, vals: any) {
    let newFormValues = { ...vals };

    // find all the items that have values of objects,
    // replace their value with their actual id
    for (const [key, value] of Object.entries(newFormValues)) {
      const tempFields = fields[key];

      if (typeof value === "object" && value !== null) {
        if ("_id" in value) {
          newFormValues[key] = value["_id"];
        } else {
          newFormValues[key] = value;
        }
      }
      if (value == null || value == "" || tempFields?.disabled) {
        delete newFormValues[key];
      }
    }

    return newFormValues;
  }

  function getData() {
    const fields = props.page.json_data;
    return sanitizeForm(fields, formValues);
  }

  function emptyValues() {
    let newFormValues = JSON.parse(
      JSON.stringify(props.page.json_data)
    ) as FormValues;

    // Make sure that all data is blank
    for (const [key, value] of Object.entries(newFormValues)) {
      newFormValues[key] = null;
    }
    return newFormValues;
  }
  function createEmptyValues() {
    setDataLoaded(true);
    setFormValues(emptyValues);
  }

  function assignValues(index: number) {
    let newFormValues = emptyValues();
    const generatedData = props.page.generated_data?.[index];

    if (generatedData) {
      for (const [key, value] of Object.entries(generatedData)) {
        if (key == "header") {
          newFormValues[key] = value;
        }
      }
    }

    setDataLoaded(true);
    setFormValues(newFormValues);
  }

  function handleInputChange(inputProps: InputProps | undefined, value: any) {
    if (!inputProps) return;

    setFormValues((prevState) => ({
      ...prevState,
      [inputProps.componentName]: value,
    }));
  }

  return (
    <FormContext.Provider
      value={{
        formValues,
        value: value,
        setValue: handleInputChange,
        duplicateValues: assignValues,
        createEmptyValues: createEmptyValues,
        getData: getData,
        isDataLoaded: isDataLoaded,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
