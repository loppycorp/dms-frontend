import { FormContextType } from "@/context/FormContext";

export interface FunctionMap {
  [key: string]: (
    context: FormContextType,
    setShow: (isShow: boolean) => void,
    fields: any
  ) => void;
}

export const park = (
  context: FormContextType,
  setShow: (isShow: boolean) => void
) => {
  setShow(true);
};

export const showCreateForm = (
  context: FormContextType,
  setShow: (isShow: boolean) => void
) => {
  context.createEmptyValues();
  setShow(true);
};

export const simulate = (
  context: FormContextType,
  setShow: (isShow: boolean) => void
) => {
  setShow(true);
};
