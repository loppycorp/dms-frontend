import slugify from "slugify";

function ButtonElement(props: {
  component: ButtonElement;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonClasses?: string | null;
}) {
  const elementId = slugify(props.component.label, { lower: true });
  return (
    <>
      <button
        className={`${props.buttonClasses} mb-2 gap-3`}
        type="button"
        onClick={props.onClick}
      >
        <div
          dangerouslySetInnerHTML={{ __html: props.component.icon }}
          className="w-4"
        />
        {props.component.label}
      </button>
    </>
  );
}

export default ButtonElement;
