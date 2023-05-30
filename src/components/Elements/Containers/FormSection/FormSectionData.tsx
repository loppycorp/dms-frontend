import FormItems from "@/components/Forms/FormItems";

function FormSectionData(props: { form: FormItem }) {
  return (
    <div className="mb-2">
      <div className="form-title mb-3"> {props.form.title}</div>
      <FormItems inputItems={props.form.forms} title={props.form.title} />
    </div>
  );
}

export default FormSectionData;
