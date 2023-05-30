import slugify from "slugify";
import DateRangePicker from "@/components/Utilities/DateRangePicker";
import { ComponentProps } from "@/components/RenderComponent/RenderComponent";

const InputDateRange = (props: ComponentProps) => {
  const elementId = slugify(props.component.label, { lower: true });

  return (
    <>
      <label className="label" htmlFor={elementId}>
        {props.component.label}
      </label>
      {/*<input*/}
      {/*  className={props.component.classes}*/}
      {/*  id={elementId}*/}
      {/*  type={props.component.type}*/}
      {/*  placeholder={props.component.placeholder}*/}
      {/*/>*/}
      <DateRangePicker {...props} />
    </>
  );
};

export default InputDateRange;
