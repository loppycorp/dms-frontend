import InputText from "@/components/Fields/InputText";
import InputSelect from "@/components/Fields/InputSelect";
import InputCheckbox from "@/components/Fields/InputCheckbox";
import RadioGroup from "@/components/Fields/RadioGroup";
import InputDateRange from "@/components/Fields/InputDateRange";
import InputAutocomplete from "@/components/Fields/InputAutocomplete/InputAutocomplete";
import Table from "@/components/Elements/Table/Table";
import InputDatePicker from "@/components/Utilities/DatePicker";
import {
  FormContextType,
  InputProps,
  useFormContext,
} from "@/context/FormContext";
import { Session } from "next-auth";
import { createUniqueID } from "@/utils/create-id";

export interface ComponentMap {
  [key: string]: React.FC<ComponentProps>;
}

export type ComponentProps = {
  context: FormContextType;
  componentName: string;
  component: any;
  inputProps?: InputProps;
  session: Session | null;
  value?: any;
  setValue?: (e: any) => void;
  editable?: boolean;
  otherOptions?: { [key: string]: any };
  id?: string;
};

export const componentMap: ComponentMap = {
  Number: InputText,
  String: InputText,
  List: InputSelect,
  Boolean: InputCheckbox,
  RadioGroup: RadioGroup,
  "Date Range": InputDateRange,
  "Reference Id": InputAutocomplete,
  Table: Table,
  Date: InputDatePicker,
};

const RenderComponent = (props: {
  componentProps: ComponentProps;
  className?: string;
}) => {
  const { componentName, component } = props.componentProps;

  const Component = componentMap[component.type];
  if (!Component) {
    throw new Error(`Unknown form key: ${component.type}`);
  }

  component.label = componentName.replaceAll("_", " ");
  component.id = componentName;

  if (component.type == "Reference Id") {
    component.api_url = component.ref;
    component.fields_to_display = component.fields;
  }

  const elementId = createUniqueID(component.label, component.id);

  return (
    <div className={`${props.className}`}>
      {component.type !== "Boolean" && component.type !== "RadioGroup" && (
        <label className="label relative inline-block" htmlFor={elementId}>
          {component.label}
          {component.required && (
            <span className="absolute -right-3 font-light label -top-3 text-lg text-primary">
              *
            </span>
          )}
        </label>
      )}

      <Component {...props.componentProps} id={elementId} />
    </div>
  );
};

export default RenderComponent;
