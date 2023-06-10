"use client";
import ActionButtons from "@/components/Utilities/Action Buttons/ActionButtons";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import ButtonItems from "@/components/Forms/ButtonItems";
import { Session } from "next-auth";
import { traverseField } from "@/utils/helpers";

export interface TableDataType {
  [key: string]: any;
}

function DisplayTableData(props: {
  children: ReactNode;
  data: TableDataType[];
  component: any;
  page: PageItem;
  display_fields: string;
  display_columns: string;
  session: Session;
}) {
  const data = props.data;
  const display_columns = props.display_fields.split(/\r?\n/);
  const display_fields = traverseField(data[0], props.display_fields);

  const params = useSearchParams()?.get("item");

  if (params) return props.children;

  return (
    <>
      <div className="w-full overflow-auto shadow rounded-2xl my-18 ">
        <table className="w-full text-sm text-left text-black bg-light overflow-hidden ">
          <thead className="text-xs text-primary-dark uppercase bg-light">
            <tr>
              {display_columns.map((header) => (
                <th
                  scope="col"
                  className="px-6 py-4 bg-primary text-light"
                  key={header}
                >
                  {header.split(".").slice(-1).toString().replaceAll("_", " ")}
                </th>
              ))}
              <th className="text-center bg-primary text-light">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
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
                        : "object"}
                    </td>
                  );
                })}
                <td className="text-center">
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
      <ButtonItems
        className={"fixed bottom-0 right-0 px-6 py-4"}
        page={props.page}
        buttons={props.page.buttons}
        session={props.session}
        buttonClasses="btn-primary "
      />
    </>
  );
}

export default DisplayTableData;
