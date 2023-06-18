"use client";
import React, { useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { ComponentProps } from "@/components/RenderComponent/RenderComponent";
import { createUniqueID } from "@/utils/create-id";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { traverseField } from "@/utils/helpers";

export interface Props extends ComponentProps {
  items: AutocompleteItemType[] | null;
  displayFields: string[];
}

export type AutocompleteItemType = { [key: string]: any };

function AutocompleteField(props: Props) {
  const selectedField = props.value || props.context.value(props.inputProps);
  const noneField = { _id: 0, first_name: "none", last_name: "" };

  const items = props.items;
  const elementId = createUniqueID(props.component.label, props.component.id);
  const selectedId = selectedField?._id;
  const [query, setQuery] = useState("");

  const setValue = (e: any) =>
    props.setValue
      ? props.setValue(e)
      : props.context.setValue(props.inputProps, e);

  useEffect(() => {
    if (items && selectedId) {
      const item = items.find((item) => item._id == selectedId) || noneField;
      // if (props.componentName == "transaction_type") {
      //   console.log(item);
      // }
      setValue(item);
    }
  }, [items, selectedId]);

  const label = (item: AutocompleteItemType) => {
    return props.displayFields
      ? props.displayFields
          .map((fieldName) => {
            return traverseField(item, fieldName);
          })
          .join(" ")
      : "";
  };

  const filteredItems =
    query === ""
      ? items
      : items?.filter((item) =>
          label(item)
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <label className="label" htmlFor={elementId}>
        {props.component.label}
      </label>
      <div>
        <Combobox
          value={selectedField}
          onChange={(e) => {
            setValue(e);
          }}
          nullable
          disabled={!props.editable}
        >
          <div className="relative">
            <div>
              <Combobox.Input
                className="input"
                displayValue={(item: AutocompleteItemType) => label(item)}
                onChange={(event) => setQuery(event.target.value)}
                id={elementId}
              />

              {items ? (
                <Combobox.Button
                  className={`absolute inset-y-0 right-0 flex items-center pr-2 ${
                    !props.editable && "hidden"
                  }`}
                >
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              ) : (
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <LoadingSpinner />
                </div>
              )}
            </div>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
              className="list-options"
            >
              <Combobox.Options className="options absolute z-10 mt-1 overflow-auto max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none sm:text-sm">
                {props.otherOptions?.isOnTable && (
                  <input
                    className="w-full bg-gray-200 text-primary-dark border-gray-300 border py-3 px-4 -mt-1 pointer-events-none"
                    value={query}
                    placeholder={"Start Typing"}
                    disabled={true}
                  />
                )}
                {filteredItems?.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : filteredItems?.length === 0 ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    No items available.
                  </div>
                ) : (
                  filteredItems?.map((item) => (
                    <Combobox.Option
                      key={item._id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-light-dark text-black" : "text-gray-900"
                        }`
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {label(item)}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
}

export default AutocompleteField;
