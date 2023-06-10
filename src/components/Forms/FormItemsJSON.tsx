"use client";
import RenderComponent from "@/components/RenderComponent/RenderComponent";
import { Session } from "next-auth";
import widthStyles from "@/utils/width-style-map";
import { useFormContext } from "@/context/FormContext";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

function FormItemsJSON(props: { items: object; session: Session | null }) {
  const itemsArray = Object.entries(props.items);
  const context = useFormContext();

  if (!context.isDataLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full border-primary flex flex-wrap items-end">
      {itemsArray.map(([componentName, component]) => {
        if (component.type == "Boolean" || component.type == "Table") {
          component.width = "1";
        }
        return (
          <RenderComponent
            className={`w-full px-3 pb-3 md:mb-0 ${
              widthStyles[component.width || "1/2"] || ""
            }`}
            componentProps={{
              context: context,
              componentName: componentName,
              component: component,
              session: props.session,
              inputProps: {
                componentName: componentName,
              },
              editable: true,
            }}
            key={componentName}
          />
        );
      })}
    </div>
  );
}

export default FormItemsJSON;
