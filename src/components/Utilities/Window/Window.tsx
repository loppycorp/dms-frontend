import WindowTab from "@/components/Utilities/Window/WindowTab";
import WindowContent from "@/components/Utilities/Window/WindowContent";
import { Suspense } from "react";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import FormSections from "@/components/Elements/Containers/FormSection/FormSections";

function Window(props: { data: WindowItem[]; session: Session | null }) {
  return (
    <div className="rounded-3xl border-light-darker border-2 bg-light overflow-hidden w-full">
      <Suspense>
        <div className="flex space-x-1 pt-1 border-b bg-light-darker">
          {props.data.map((windowItem, index) => (
            <WindowTab
              title={windowItem.title}
              key={windowItem.id}
              index={index}
            />
          ))}
        </div>
      </Suspense>
      <div className="px-4 pt-2 pb-10 max-h-screen overflow-auto w-full relative">
        {props.data.map((windowItem, index) => (
          <div
            key={index}
            className="ring-0 focus:outline-none focus:ring-0 w-full"
          >
            <Suspense>
              {/*<WindowContent title={windowItem.title} session={props.session}>*/}
              {/*  {*/}
              {/*    // @ts-ignore*/}
              {/*    <FormSections formSections={windowItem.form.forms} />*/}
              {/*  }*/}
              {/*</WindowContent>*/}
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Window;
