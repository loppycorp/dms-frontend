import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { fetchAPI, getApiURL } from "@/lib/api";
import DisplayTableData, {
  TableDataType,
} from "@/components/Elements/Table/DisplayTableData";
import ButtonItems from "@/components/Forms/ButtonItems";
import { FormProvider } from "@/context/FormContext";
import PageContent from "@/app/system/[...slug]/PageContent";
import LoginButton from "@/components/Auth/LoginButton";

const getDataFromApi = async (apiUrl: string, session: Session) => {
  return await fetchAPI(
    apiUrl,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      next: { tags: [apiUrl], revalidate: 3600 },
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
    const fetchedData = await getDataFromApi(props.page.api_url, props.session);
    props.page.generated_data = fetchedData.data;

    return (
      <>
        <FormProvider page={props.page}>
          {
            // @ts-ignore
            <DisplayTableData
              data={
                //@ts-ignore
                props.page.generated_data as TableDataType[]
              }
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
