import FormItemsJSON from "@/components/Forms/FormItemsJSON";
import { Session } from "next-auth";

function FormSectionsJSON(props: {
  formSections: object;
  window: string;
  session: Session | null;
}) {
  if (!props.formSections) return <div>No Elements found</div>;
  const formSectionsArray = Object.entries(props.formSections);

  return (
    <div className="w-full border-primary flex flex-wrap items-end">
      {formSectionsArray.map(([key, value]) => {
        if (typeof value != "object") {
          // throw new Error(`Not a section type: ${item.__component}`);
          return <div key={key}></div>;
        }
        return (
          <div className={`w-full px-3 pb-3 md:mb-0`} key={key}>
            <div className="mb-2">
              <div className="form-title mb-3">{key}</div>
              <FormItemsJSON
                items={value}
                windowName={props.window}
                sectionName={key}
                session={props.session}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FormSectionsJSON;
