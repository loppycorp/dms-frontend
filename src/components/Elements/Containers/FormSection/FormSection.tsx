"use client";
import FormSectionData from "@/components/Elements/Containers/FormSection/FormSectionData";

function FormSection(props: { component: FormSectionItem }) {
  return (
    <>
      {props.component.forms.map((item, index) => (
        // @ts-ignore
        <FormSectionData form={item} key={index} />
      ))}
    </>
  );
}

export default FormSection;
