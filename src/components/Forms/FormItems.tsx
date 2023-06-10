"use client";
import InputText from "@/components/Fields/InputText";
import InputSelect from "@/components/Fields/InputSelect";
import InputDateRange from "@/components/Fields/InputDateRange";
import SectionTitle from "@/components/Elements/SectionTitle";
import Table from "@/components/Elements/Table/Table";
import RadioGroup from "@/components/Fields/RadioGroup";
import InputCheckbox from "@/components/Fields/InputCheckbox";
import { createSlug } from "@/utils/create-id";
import { FormContextType, useFormContext } from "@/context/FormContext";
import InputAutocomplete from "@/components/Fields/InputAutocomplete/InputAutocomplete";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import widthStyles from "@/utils/width-style-map";
interface ComponentMap {
  [key: string]: React.FC<{
    component: any;
    context: FormContextType;
    session: any;
    labelSlug: string;
    parentSlug?: string;
  }>;
}

const componentMap: ComponentMap = {
  // "forms.input-text": InputText,
  // "forms.input-select": InputSelect,
  // "forms.input-date-range": InputDateRange,
  // "forms.input-checkbox": InputCheckbox,
  // "forms.input-autocomplete": InputAutocomplete,
  // "forms.section-title": SectionTitle,
  // "forms.radio-group": RadioGroup,
  // "elements.table": Table,
};

function FormItems(props: { inputItems: InputItem[]; title?: string }) {
  const { data: session } = useSession();
  const formContext = useFormContext();

  if (!session) return <LoadingSpinner />;
  if (!props.inputItems) return <div>No Elements found</div>;

  return (
    <div className="w-full border-primary flex flex-wrap items-end">
      {props.inputItems.map((item, index) => {
        const Component = componentMap[item.__component];
        if (!Component) {
          throw new Error(`Unknown form key: ${item.__component}`);
        }
        const labelSlug = createSlug(item.label);
        const parentSlug = props.title ? createSlug(props.title) : undefined;
        return (
          <div
            className={`w-full px-3 pb-3 md:mb-0  ${
              widthStyles[item.width] || ""
            }`}
            key={index}
          >
            <Component
              component={item}
              context={formContext}
              session={session}
              labelSlug={labelSlug}
              parentSlug={parentSlug}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FormItems;
