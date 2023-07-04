import { Session } from "next-auth";
import JSONWindow from "@/components/Utilities/Window/JSONWindow";
import FormItemsJSON from "@/components/Forms/FormItemsJSON";
import ButtonItems from "@/components/Forms/ButtonItems";
import React from "react";
import BackButton from "@/components/Utilities/Action Buttons/BackButton";
import WindowContent from "@/components/Utilities/Window/WindowContent";
// import AdditionalSections from "@/components/Elements/AdditionalSections/AdditionalSections";

async function PageContent(props: { page: PageItem; session: Session | null }) {
  if (props.session) {
    return (
      <div className="h-full relative">
        <div className="flex gap-3 items-start mb-3">
          <BackButton />
          <ButtonItems
            page={props.page}
            buttons={props.page.item_buttons}
            session={props.session}
            buttonClasses="btn-tiny"
          />
        </div>

        <FormItemsJSON items={props.page.json_data} session={props.session} />
        <WindowContent
          api={props.page.api_url}
          session={props.session}
        ></WindowContent>
        {/* <AdditionalSections
          additionalSections={props.page.additional_sections}
          session={props.session}
          page={props.page}
        />
        <JSONWindow
          jsonData={props.page.json_data}
          session={props.session}
          api_url={props.page.api_url}
        /> */}
      </div>
    );
  }
  return <></>;
}

export default PageContent;
