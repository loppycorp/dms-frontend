"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import slugify from "slugify";
import { ComponentProps } from "@/components/RenderComponent/RenderComponent";
import { createUniqueID } from "@/utils/create-id";

const InputDatePicker = (props: ComponentProps) => {
  const selectedField = props.value || props.context.value(props.inputProps);
  const elementId = createUniqueID(props.component.label, props.component.id);

  const [date, setDate] = useState(
    // new Date(props.inputProp.value.from)
    selectedField ? new Date(selectedField) : new Date()
  );

  const setValue = (e: any) =>
    props.setValue
      ? props.setValue(e)
      : props.context.setValue(props.inputProps, e);

  useEffect(() => {
    setValue(date.toISOString());
  }, [date]);

  return (
    <>
      <label className="label" htmlFor={elementId}>
        {props.component.label}
      </label>
      <div className="flex gap-2 justify-center items-center">
        <DatePicker
          className="input"
          selected={date}
          // @ts-ignore
          onChange={setDate}
          id={elementId}
        />
      </div>
    </>
  );
};

export default InputDatePicker;
