import { createUniqueID } from "@/utils/create-id";
import { ComponentProps } from "@/components/RenderComponent/RenderComponent";
import { useEffect } from "react";

function InputText(props: ComponentProps) {
  const component = props.component as InputItem;
  const elementId = createUniqueID(component.label, component.id);
  let selectedField = props.value || props.context.value(props.inputProps);

  const setValue = (e: any) =>
    props.setValue
      ? props.setValue(e.target.value)
      : props.context.setValue(props.inputProps, e.target.value);

  return (
    <>
      <label className="label" htmlFor={elementId}>
        {component.label}
      </label>
      <input
        className="input"
        id={elementId}
        type={component.type == "Number" ? "number" : "text"}
        value={selectedField || ""}
        onChange={setValue}
        disabled={!props.editable || component.disabled}
      />
    </>
  );
}

export default InputText;
