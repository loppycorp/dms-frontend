import WindowTab from "@/components/Utilities/Window/WindowTab";
import WindowContent from "@/components/Utilities/Window/WindowContent";
import { Suspense } from "react";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import FormSectionsJSON from "@/components/Elements/Containers/FormSection/FormSectionsJSON";
import { session } from "next-auth/core/routes";

function JSONWindow(props: {
  jsonData: object;
  session: Session | null;
  api_url: string;
}) {
  return (
    <div className="rounded-3xl border-light-darker border-2 bg-light w-full">
      <Suspense>
        <div className="flex space-x-1 pt-1 border-b bg-light-darker">
          {Object.keys(props.jsonData).map(function (key, index) {
            if (key == "header") return <></>;
            return <WindowTab title={key} key={index} index={index} />;
          })}
        </div>
      </Suspense>
      <div className="px-4 py-2 w-full relative">
        {Object.entries(props.jsonData).map(([key, value]) => {
          if (key == "header") return <></>;
          return (
            <div
              key={key}
              className="ring-0 focus:outline-none focus:ring-0 w-full"
            >
              <Suspense>
                <WindowContent
                  title={key}
                  session={props.session}
                  api={props.api_url}
                >
                  {
                    // @ts-ignore
                    <FormSectionsJSON
                      formSections={value}
                      window={key}
                      session={props.session}
                    />
                  }
                </WindowContent>
              </Suspense>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default JSONWindow;
