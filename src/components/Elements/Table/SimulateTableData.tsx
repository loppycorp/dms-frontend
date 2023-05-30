"use client";
import React, { useEffect, useState } from "react";
import RenderComponent, {
  ComponentProps,
} from "@/components/RenderComponent/RenderComponent";

function SimulateTableData(props: ComponentProps) {
  // because the retrieved data from api doesn't have a component name for table, let's leave it empty
  if (props.inputProps) props.inputProps.componentName = "";

  const headers = Object.keys(props.component.fields);
  const tableFieldsToSimulate = ["transaction_type", "gl_account", "amount"];

  const emptyRow = tableFieldsToSimulate.reduce(
    (acc: { [key: string]: string }, str) => {
      acc[str] = "";
      return acc;
    },
    {}
  );
  const existingData = props.context.value(props.inputProps);
  const [rows, setRows] = useState([emptyRow]);

  useEffect(() => {
    if (Array.isArray(existingData)) setRows(existingData);
  }, []);

  const addRow = () => {
    setRows((arr) => [...arr, emptyRow]);
  };

  const setRowValue = (rowIndex: number, header: string, value: string) => {
    const newRows = rows.map((row, index) =>
      rowIndex == index ? { ...row, [header]: value } : row
    );
    setRows(newRows);
    props.context.setValue(props.inputProps, newRows);
  };

  return (
    <div className="w-full overflow-auto h-full table-data">
      <table className="w-full text-sm text-left text-primary-dark bg-gray-400 overflow-hidden border border-gray-400">
        <thead className="text-xs text-primary-dark uppercase bg-light-dark">
          <tr>
            {tableFieldsToSimulate.map((header) => (
              <th
                scope="col"
                className="p-1 text-center border border-gray-400"
                key={header}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-light-lighter">
          {rows.map((row, rowIndex) => (
            <tr className="border-b" key={rowIndex}>
              {tableFieldsToSimulate.map((header, colIndex) => (
                <td className="border border-gray-400" key={colIndex}>
                  <div>
                    <RenderComponent
                      key={rowIndex + colIndex + ""}
                      componentProps={{
                        context: props.context,
                        component: props.component.fields[header],
                        session: props.session,
                        componentName: header,
                        value: rows[rowIndex][header],
                        setValue: (e) => setRowValue(rowIndex, header, e),
                        editable: false,
                      }}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SimulateTableData;
