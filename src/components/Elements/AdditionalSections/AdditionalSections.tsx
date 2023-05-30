"use client";
import AdditionalSection from "@/components/Elements/AdditionalSections/AdditionalSection";
import { useFormContext } from "@/context/FormContext";
import { Session } from "next-auth";

function AdditionalSections(props: {
  additionalSections: any[];
  session: Session | null;
  page: PageItem;
}) {
  const context = useFormContext();

  if (!props.additionalSections) return <div>No Elements found</div>;

  return (
    <div className="w-full border-primary flex flex-wrap items-end">
      {props.additionalSections.map((item, index) => {
        return (
          <div
            className={`rounded-3xl border-light-darker border-2 bg-light w-full`}
            key={index}
          >
            <div className="pt-1 border-b bg-light-darker">
              <div
                className="w-full py-2.5 text-center text-sm leading-5
                      focus:outline-none rounded-t-3xl border-b bg-light
                      text-primary cursor-default font-bold uppercase"
              >
                {item.__component.split(".")[1].replaceAll("-", " ")}
              </div>
            </div>
            <div className="px-4 pt-2 pb-4 w-full relative">
              <AdditionalSection
                component={item}
                context={context}
                session={props.session}
                page={props.page}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdditionalSections;
