"use client";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";

function SwitchElement(props: {
  value: boolean;
  setValue: (e: boolean) => void;
  id?: string;
}) {
  return (
    <Switch
      checked={props.value}
      onChange={() => props.setValue(!props.value)}
      className={`${
        props.value ? "bg-primary" : "bg-neutral-400"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
      id={props.id}
    >
      <span
        className={`${
          props.value ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}

export default SwitchElement;
