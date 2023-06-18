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
          <div className={` w-full`} key={index}>
            <AdditionalSection
              component={item}
              context={context}
              session={props.session}
              page={props.page}
            />
          </div>
        );
      })}
    </div>
  );
}

export default AdditionalSections;
