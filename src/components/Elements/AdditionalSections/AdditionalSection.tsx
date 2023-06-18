import InputText from "@/components/Fields/InputText";
import {
  FormContextType,
  InputProps,
  useFormContext,
} from "@/context/FormContext";
import { Session } from "next-auth";
import widthStyles from "@/utils/width-style-map";
import DocumentStatus from "@/components/Elements/AdditionalSections/Components/DocumentStatus";
import Statistics from "./Components/Statistics";

interface AdditionalSectionMap {
  [key: string]: React.FC<AdditionalSectionProps>;
}

export type AdditionalSectionProps = {
  context: FormContextType;
  component: any;
  session: Session | null;
  page: PageItem;
};

export const additionalSectionMap: AdditionalSectionMap = {
  "sections.document-status": DocumentStatus,
  "sections.statistics": Statistics,
};

const AdditionalSection = (props: AdditionalSectionProps) => {
  const formContext = useFormContext();
  const { component } = props;

  const Component = additionalSectionMap[component.__component];
  if (!Component) {
    throw new Error(`Unknown form key: ${component.__component}`);
  }

  return <Component {...props} />;
};

export default AdditionalSection;
