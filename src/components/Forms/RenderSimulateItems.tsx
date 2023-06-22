"use client";
import { Session } from "next-auth";
import { useFormContext } from "@/context/FormContext";
import SimulateTableData from "@/components/Elements/Table/SimulateTableData";

function RenderSimulateItems(props: {
  items: object;
  session: Session | null;
}) {
  const itemsArray = Object.entries(props.items);
  const context = useFormContext();

  return (
    <>
      {itemsArray.map(([componentName, component]) => {
        const inputProps = {
          componentName: componentName,
        };
        let selectedField = context.value(inputProps);

        switch (component.type) {
          case "Table":
            return (
              <div className="mt-4">
                <SimulateTableData
                  context={context}
                  componentName={componentName}
                  component={component}
                  session={props.session}
                  inputProps={{
                    componentName: componentName,
                  }}
                  key={componentName}
                />
              </div>
            );
          case "Reference Id":
            if (selectedField) {
              const displayFields = component.fields?.trim().split(/\r?\n|, /);

              selectedField = Object.entries(selectedField)
                .map(([fieldName, fieldValue]) => {
                  if (displayFields?.includes(fieldName)) return fieldValue;
                })
                .join(" ");
            }
        }

        return (
          <div className="flex gap-2 mr-5" key={componentName}>
            <div className="label tracking-wider">
              {componentName.replace("_", " ")}:{" "}
            </div>
            <div className="label font-medium tracking-wider">
              {selectedField?.toString()}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default RenderSimulateItems;
