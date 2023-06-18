"use server";

import { Session } from "next-auth";
import { fetchAPI, getApiURL } from "@/lib/api";
import DisplayTableData from "@/components/Elements/Table/DisplayTableData";
import { FormProvider } from "@/context/FormContext";
import PageContent from "@/app/system/[...slug]/PageContent";
import LoginButton from "@/components/Auth/LoginButton";
import { revalidateTag } from "next/cache";

export const revalidatePageData = async () => {
  revalidateTag("page-data");
};

export const getDataFromApi = async (
  apiUrl: string,
  session: Session,
  page_num: number,
  page_limit?: number
) => {
  const api = apiUrl.split("?");

  let params: any = {};
  if (api.length > 0) {
    params = Object.fromEntries(new URLSearchParams(api[1]));
  }

  return await fetchAPI(
    `${api[0]}`,
    {
      ...params,
      page_num: page_num,
      page_limit: page_limit,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      next: { tags: [apiUrl, "page-data"], revalidate: 3600 },
    }
  );
};

async function DisplayPageContent(props: {
  page: PageItem;
  session: Session | null;
}) {
  const jwtErrors = ["auth.err.invalid_token", "Auth Error: jwt expired"];

  const userResponse = await fetch(getApiURL() + "/users/profile", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.session?.user.token}`,
    },
  });

  if (!userResponse.ok) {
    const res = await userResponse.json();
    if (jwtErrors.includes(res.message)) {
      return (
        <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex items-center flex-col text-center gap-2">
            <p className="text-base font-semibold text-primary">
              Login Expired
            </p>
            <p className="mt-2 text-base leading-7 text-gray-600">
              Please <b>login</b> again to access this page.
            </p>
            <LoginButton
              isLoggedIn={true}
              replaceText="Click here to login"
            ></LoginButton>
          </div>
        </div>
      );
    }
  }

  if (props.session) {
    return (
      <>
        <FormProvider page={props.page} session={props.session}>
          {
            // @ts-ignore
            <DisplayTableData
              display_fields={props.page.display_fields}
              display_columns={props.page.display_columns}
              page={props.page}
              component={props.page.buttons[0]}
              session={props.session}
            >
              {
                // @ts-ignore
                <PageContent page={props.page} session={props.session} />
              }
            </DisplayTableData>
          }
        </FormProvider>
      </>
    );
  }
  return <></>;
}

export default DisplayPageContent;
