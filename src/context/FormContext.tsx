"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useSearchParams } from "next/navigation";
import { getDataFromApi } from "@/app/system/[...slug]/DisplayPageContent";
import { Session } from "next-auth";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

export interface FormValues {
  [window: string]: { [parent: string]: any };
}

export interface FieldValue {
  [key: string]: any;
}

export interface InputProps {
  windowName: string;
  parentName: string;
  componentName: string;
}

export type FormContextType = {
  formValues: FormValues;
  value: (valueProps: InputProps | undefined) => any;
  setValue: (valueProps: InputProps | undefined, value: any) => void;
  duplicateValues: (index: number) => void;
  createEmptyValues: () => void;
  getData: () => any;
  getAllPageItems: () => any;
  allItems: any;
  isDataLoaded: boolean;
  pageData: { data: any[]; pagination: PaginationItem } | undefined;
  refreshData: () => void;
  isPending: boolean;
  currentSelectedItemId: string;
};

const FormContext = createContext<FormContextType>({
  formValues: {},
  value: () => null,
  setValue: () => {},
  duplicateValues: () => {},
  createEmptyValues: () => {},
  getData: () => null,
  getAllPageItems: () => null,
  allItems: null,
  isDataLoaded: false,
  pageData: undefined,
  refreshData: () => null,
  isPending: false,
  currentSelectedItemId: "",
});

export const FormProvider = (props: {
  children: React.ReactNode;
  page: PageItem;
  session: Session;
}) => {
  const [isPending, startTransition] = useTransition();
  const [formValues, setFormValues] = useState<FormValues>(emptyValues);
  const [pageData, setPageData] = useState<any>(null);
  const [allItems, setAllItems] = useState<any>(null);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const params = useSearchParams();
  const [currentSelectedItemId, setCurrentSelectedItemId] = useState("");

  useEffect(() => {
    refreshPageData();
  }, [params]);

  useEffect(() => {
    const itemIdParam = params?.get("item");
    setCurrentSelectedItemId(itemIdParam || "");

    if (pageData && itemIdParam) {
      const index = pageData.data.findIndex((item: any) => {
        return item._id === itemIdParam;
      });
      assignValues(index);
    }
  }, [pageData]);

  function refreshPageData() {
    const pageParam = params?.get("page");

    startTransition(() => {
      getDataFromApi(
        props.page.api_url,
        props.session,
        parseInt(pageParam || "1")
      ).then((res) => {
        setPageData(res);
      });
    });
  }
  function value(inputProps?: InputProps) {
    if (!inputProps) return;
    if (inputProps.parentName) {
      if (inputProps.componentName != "") {
        return formValues[inputProps.windowName]?.[inputProps.parentName]?.[
          inputProps.componentName
        ];
      } else {
        return formValues[inputProps.windowName]?.[inputProps.parentName];
      }
    }

    return formValues[inputProps.windowName][inputProps.componentName];
  }

  // Manipulate the data depending on the required api payload
  function sanitizeForm(fields: any, vals: any) {
    let newFormValues = { ...vals };

    // find all the items that have values of objects,
    // replace their value with their actual id
    for (const [key, value] of Object.entries(newFormValues)) {
      const tempFields = fields?.[key];

      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          // if a table
          if (key == "_id") {
            delete newFormValues[key];
          } else {
            newFormValues[key] = value.map((item) =>
              sanitizeForm(tempFields, item)
            );
          }
        } else if ("_id" in value) {
          newFormValues[key] = value["_id"];
        } else {
          newFormValues[key] = sanitizeForm(tempFields, value);
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

  function getAllPageItems() {
    startTransition(() => {
      getDataFromApi(props.page.api_url, props.session, 1, 99999).then(
        (res) => {
          const fields = props.page.json_data;
          if (res.data) {
            const items = res.data.map((item: any) => {
              return sanitizeForm(fields, item);
            });
            setAllItems(items);
          }
        }
      );
    });
  }

  function emptyValues() {
    let newFormValues = JSON.parse(
      JSON.stringify(props.page.json_data)
    ) as FormValues;

    // let newFormValues = props.page.json_data as FormValues;

    // Make sure that all data is blank
    for (const [key, value] of Object.entries(newFormValues)) {
      if (key == "header") {
        for (const [key1, value1] of Object.entries(value)) {
          newFormValues[key][key1] = null;
        }
      } else {
        for (const [key1, value1] of Object.entries(value)) {
          for (const [key2, value2] of Object.entries(value1)) {
            if (Array.isArray(value1)) {
              newFormValues[key][key1] = "";
            } else {
              newFormValues[key][key1] = null;
            }
          }
        }
      }
    }
    return newFormValues;
  }

  function createEmptyValues() {
    setDataLoaded(true);
    setFormValues(emptyValues);
  }

  function assignValues(index: number) {
    let newFormValues = emptyValues();
    const generatedData = pageData?.data?.[index] as FormValues;

    if (generatedData) {
      for (const [key, value] of Object.entries(generatedData)) {
        if (key == "header") {
          for (const [key1, value1] of Object.entries(value)) {
            newFormValues[key][key1] = value1;
          }
        } else {
          for (const [key1, value1] of Object.entries(value)) {
            for (const [key2, value2] of Object.entries(value1 as any)) {
              if (Array.isArray(value1)) {
                newFormValues[key][key1] = value1;
              } else if (newFormValues[key]?.[key1]?.hasOwnProperty(key2)) {
                newFormValues[key][key1][key2] = value2;
              }
            }
          }
        }
      }
    }

    console.log(newFormValues);
    setDataLoaded(true);
    setFormValues(newFormValues);
  }

  function handleInputChange(inputProps: InputProps | undefined, value: any) {
    if (!inputProps) return;

    const windowFields = formValues[inputProps.windowName];
    let sectionFields: FormValues = {};
    if (inputProps.parentName != "") {
      if (inputProps.componentName != "") {
        sectionFields = windowFields[inputProps.parentName];
        sectionFields[inputProps.componentName] = value;
      } else {
        windowFields[inputProps.parentName] = value;
      }
    } else {
      windowFields[inputProps.componentName] = value;
    }

    setFormValues((prevState) => ({
      ...prevState,
      [inputProps.windowName]: windowFields,
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
        getAllPageItems: getAllPageItems,
        allItems: allItems,
        isDataLoaded: isDataLoaded,
        pageData: pageData,
        refreshData: refreshPageData,
        isPending: isPending,
        currentSelectedItemId: currentSelectedItemId,
      }}
    >
      {isPending && (
        <LoadingSpinner className="absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center" />
      )}
      {props.children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
