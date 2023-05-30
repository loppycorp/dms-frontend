"use client";
import slugify from "slugify";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import SwitchElement from "@/components/Elements/SwitchElement";
import { FormContextType, InputProps } from "@/context/FormContext";
import { ComponentProps } from "@/components/RenderComponent/RenderComponent";
import { createUniqueID } from "@/utils/create-id";

function InputCheckbox(props: ComponentProps) {
  const component = props.component as InputItem;
  const elementId = createUniqueID(component.label, component.id);
  const selectedField = props.value || props.context.value(props.inputProps);

  const setValue = (e: any) =>
    props.setValue
      ? props.setValue(e)
      : props.context.setValue(props.inputProps, e);

  return (
    <>
      <div className="input-checkbox flex items-center">
        <SwitchElement
          value={selectedField}
          setValue={setValue}
          id={elementId}
        />
        <label htmlFor={elementId} className="label ml-3">
          {props.component.label}
        </label>
      </div>
    </>
  );
}

export default InputCheckbox;
