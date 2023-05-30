import FormSection from "@/components/Elements/Containers/FormSection/FormSection";

function FormSections(props: { formSections: FormSectionItem[] }) {
  if (!props.formSections) return <div>No Elements found</div>;

  return (
    <div className="w-full border-primary flex flex-wrap items-end">
      {props.formSections.map((item, index) => {
        if (item.__component != "containers.form-section") {
          // throw new Error(`Not a section type: ${item.__component}`);
        }
        return (
          <div
            className={`w-full px-3 pb-3 md:mb-0 ${item.classes} `}
            key={index}
          >
            <FormSection component={item} />
          </div>
        );
      })}
    </div>
  );
}

export default FormSections;
