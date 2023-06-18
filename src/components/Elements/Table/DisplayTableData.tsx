"use client";
import ActionButtons from "@/components/Utilities/Action Buttons/ActionButtons";
import { ReactNode, useEffect, useState, useTransition } from "react";
import ButtonItems from "@/components/Forms/ButtonItems";
import { Session } from "next-auth";
import { exportStringValues, traverseField } from "@/utils/helpers";
import { Pagination } from "@/components/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import useQueryParams, { QueryParams } from "@/utils/use-query-params";
import { useFormContext } from "@/context/FormContext";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import Statistics from "../AdditionalSections/Components/Statistics";
import AdditionalSections from "../AdditionalSections/AdditionalSections";

function DisplayTableData(props: {
  children: ReactNode;
  component: any;
  page: PageItem;
  display_fields: string;
  display_columns: string;
  session: Session;
}) {
  const { pageData, getAllPageItems, allItems, isPending } = useFormContext();
  const [data, setData] = useState<any>(null);
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();
  const params = useSearchParams()?.get("item");
  const display_columns = props.display_fields.split(/\r?\n/);

  useEffect(() => {
    if (allItems) {
      const items = allItems.map((item: any) => {
        return exportStringValues(item);
      });
      setData(items);
    }
  }, [allItems]);

  const onPageChange = (event: { selected: number }) => {
    setQueryParams({ page: event.selected + 1 });
  };

  if (params) return props.children;

  return (
    <>
      <AdditionalSections
        additionalSections={props.page.additional_sections}
        session={props.session}
        page={props.page}
      />
      <div className="text-black text-2xl py-2 px-2 font-bold">
        {props.page.title}
      </div>
      {pageData ? (
        <div className="w-full overflow-auto shadow rounded-2xl">
          <table className="w-full text-sm text-left text-primary-dark bg-light overflow-hidden">
            <thead className="text-xs text-primary-dark uppercase bg-light border-b border-gray-300">
              <tr>
                {display_columns.map((header) => (
                  <th scope="col" className="px-6 py-4" key={header}>
                    {header
                      .split(".")
                      .slice(-1)
                      .toString()
                      .replaceAll("_", " ")}
                  </th>
                ))}
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData?.data.map((row, rowIndex) => (
                <tr
                  className="border-b border-gray-300 hover:bg-light-lighter"
                  key={rowIndex}
                >
                  {display_columns.map((item) => {
                    const traversedItem = traverseField(row, item);

                    return (
                      <td className="px-6 py-4" key={`${rowIndex}-${item}`}>
                        {/*{typeof row[header] == "boolean" ? (*/}
                        {/*  <SwitchElement value={row[header]} />*/}
                        {/*) : (*/}
                        {/*  row[header]*/}
                        {/*)}*/}

                        {typeof traversedItem == "string" ||
                        typeof traversedItem == "number"
                          ? traversedItem
                          : "-"}
                      </td>
                    );
                  })}
                  <td className="text-center w-32">
                    <ActionButtons
                      page={props.page}
                      component={props.component}
                      index={rowIndex}
                      id={row._id}
                    ></ActionButtons>
                  </td>
                </tr>
              ))}
              <tr></tr>
            </tbody>
          </table>
        </div>
      ) : (
        <LoadingSpinner />
      )}
      <Pagination
        itemsPerPage={pageData?.pagination.page_limit || 0}
        totalItems={pageData?.pagination.total_result || 0}
        currentPageNumber={queryParams?.get("page")}
        onPageChange={onPageChange}
        className="flex justify-end mt-4"
      ></Pagination>
      <ButtonItems
        page={props.page}
        buttons={props.page.buttons}
        session={props.session}
        buttonClasses="btn-primary"
      />
    </>
  );
}

export default DisplayTableData;
