import AutocompleteField, {
  AutocompleteItemType,
} from "@/components/Fields/InputAutocomplete/AutocompleteField";
import { fetchAPI } from "@/lib/api";
import useSWR from "swr";
import { Session } from "next-auth";
import { ComponentProps } from "@/components/RenderComponent/RenderComponent";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

const fetcher = (args: { session: Session; url: string }) =>
  fetchAPI(
    args.url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${args.session.user.token}`,
      },
      cache: "no-cache",
    }
  );

function InputAutoComplete(props: ComponentProps) {
  const displayFields = props.component.fields_to_display
    ?.trim()
    .split(/\r?\n|, /);
  const { data } = useSWR(
    { session: props.session, url: props.component.api_url },
    fetcher
  );

  const fetchedData: AutocompleteItemType[] | null = data?.data;

  return (
    <AutocompleteField
      {...props}
      items={fetchedData || null}
      displayFields={displayFields}
    ></AutocompleteField>
  );
}

export default InputAutoComplete;
