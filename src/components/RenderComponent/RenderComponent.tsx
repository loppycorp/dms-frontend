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
import widthStyles from "@/utils/width-style-map";

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
  const formContext = useFormContext();
  const { componentName, component } = props.componentProps;

  const Component = componentMap[component.type];
  if (!Component) {
    throw new Error(`Unknown form key: ${component.type}`);
  }

  component.label = componentName.replace("_", " ");
  component.id = componentName;
  if (component.type == "Reference Id") {
    component.api_url = component.ref;
    component.fields_to_display = component.fields;
  }

  return (
    <div className={props.className}>
      <Component {...props.componentProps} />
    </div>
  );
};

export default RenderComponent;
