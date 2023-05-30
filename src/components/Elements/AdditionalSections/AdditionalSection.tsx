import InputText from "@/components/Fields/InputText";
import {
  FormContextType,
  InputProps,
  useFormContext,
} from "@/context/FormContext";
import { Session } from "next-auth";
import widthStyles from "@/utils/width-style-map";
import AmountInformation from "@/components/Elements/AdditionalSections/Components/AmountInformation";
import DocumentStatus from "@/components/Elements/AdditionalSections/Components/DocumentStatus";

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
  "sections.amount-information": AmountInformation,
  "sections.document-status": DocumentStatus,
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
