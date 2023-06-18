"use client";
import slugify from "slugify";
import { Listbox, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ComponentProps } from "@/components/RenderComponent/RenderComponent";
import { createUniqueID } from "@/utils/create-id";

function InputSelect(props: ComponentProps) {
  const component = props.component as InputSelect;
  const elementId = createUniqueID(component.label, component.id);
  const items = component.items.trim().split(/\r?\n|, /);
  const selectedField =
    props.value || props.context.value(props.inputProps) || items[0];

  const setValue = (e: any) =>
    props.setValue
      ? props.setValue(e)
      : props.context.setValue(props.inputProps, e);

  return (
    <>
      <label className="label" htmlFor={elementId}>
        {component.label}
      </label>
      <Listbox value={selectedField} onChange={setValue}>
        <div className="relative">
          <Listbox.Button className="relative input text-left" id={elementId}>
            <span className="block truncate">{selectedField}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="list-options"
          >
            <Listbox.Options className="options absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-light py-1 text-base shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-light-dark" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-dark">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}

export default InputSelect;
