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
  setValue: () => null,
  duplicateValues: () => null,
  createEmptyValues: () => null,
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
        return item._id == itemIdParam;
      });
      console.log("acangangkasgas", index, "agksamgkasmnag", itemIdParam);
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

    if (inputProps.componentName != "") {
      return formValues[inputProps.componentName];
    } else {
      return null;
    }
  }

  function sanitizeForm(fields: any, vals: any) {
    let newFormValues: any = { ...vals };

    // Find all the items that have values of objects,
    // replace their value with their actual id
    for (const [key, value] of Object.entries(newFormValues)) {
      const tempFields = fields?.[key];

      if (typeof value === "object" && value !== null) {
        if ("_id" in value) {
          newFormValues[key] = value["_id"];
        } else {
          newFormValues[key] = value;
        }
      }
      if (
        value == null ||
        value === "" ||
        (tempFields && tempFields.disabled)
      ) {
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
      getDataFromApi(props.page.api_url, props.session, 1, 10).then((res) => {
        const fields = props.page.json_data;
        if (res.data) {
          const items = res.data.map((item: any) => {
            return sanitizeForm(fields, item);
          });
          setAllItems(items);
        }
      });
    });
  }

  function emptyValues() {
    let newFormValues = JSON.parse(
      JSON.stringify(props.page.json_data)
    ) as FormValues;

    // let newFormValues = props.page.json_data as FormValues;

    // Make sure that all data is blank
    for (const [key] of Object.entries(newFormValues)) {
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
    const generatedData = pageData?.data?.[index] as FormValues;

    if (generatedData) {
      for (const [key, value] of Object.entries(generatedData)) {
        newFormValues[key] = value;
      }
    }
    console.log(generatedData);
    console.log(pageData.data);
    console.log(index);
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
