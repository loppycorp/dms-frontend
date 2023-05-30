"use client";
import slugify from "slugify";
import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { FormContextType, InputProps } from "@/context/FormContext";
import { createUniqueID } from "@/utils/create-id";
import { ComponentProps } from "@/components/RenderComponent/RenderComponent";

function RadioGroupInput(props: ComponentProps) {
  const elementId = createUniqueID(props.component.label, props.component.id);
  const items: string[] = props.component.items.trim().split(/\r?\n|, /);
  let [item, setItem] = useState(items[0]);

  useEffect(() => {
    if (items) {
      for (const field of items) {
        props.context.setValue(
          { ...props.inputProps, componentName: field } as
            | InputProps
            | undefined,
          item == field
        );
      }
    }
  }, [item]);

  return (
    <>
      <RadioGroup
        value={item}
        onChange={setItem}
        className="text-sm bg-gray-100 rounded-2xl shadow-sm"
      >
        {/*<RadioGroup.Label>{props.component.label}</RadioGroup.Label>*/}
        {items.map((item, index) => (
          <RadioGroup.Option value={item} key={index}>
            {({ checked }) => (
              <div className={"w-full border-b border-gray-300 rounded-t-2xl "}>
                <div className="flex items-center pl-3">
                  <input
                    id={slugify(item)}
                    type="radio"
                    name={elementId}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 shadow"
                    defaultChecked={checked}
                  />
                  <label
                    htmlFor={slugify(item)}
                    className="w-full py-3 ml-3 text-sm"
                  >
                    {item}
                  </label>
                </div>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </>
  );
}

export default RadioGroupInput;
