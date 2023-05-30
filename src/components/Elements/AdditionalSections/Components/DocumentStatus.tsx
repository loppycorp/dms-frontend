import React, { useEffect, useState } from "react";
import { AdditionalSectionProps } from "@/components/Elements/AdditionalSections/AdditionalSection";
import { traverseField } from "@/utils/helpers";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
interface ColorMap {
  [key: string]: string;
}
function DocumentStatus(props: AdditionalSectionProps) {
  const { status_field } = props.component;
  const params = useSearchParams()?.get("item");
  const [status, setStatus] = useState("");

  const DOC_STATUS_HOLD = "HOLD";
  const DOC_STATUS_COMPLETED = "POST";
  const DOC_STATUS_PARKED = "PARKED";
  const DOC_STATUS_PENDING = "PENDING";
  const DOC_STATUS_SIMULATE = "SIMULATE";

  const classesMap: ColorMap = {
    HOLD: "bg-gray-800 text-gray-100",
    POST: "bg-green-700 text-green-100",
    PARKED: "bg-yellow-800 text-yellow-100",
    PENDING: "bg-primary text-light",
    SIMULATE: "bg-primary text-light",
  };

  useEffect(() => {
    const generatedData = props.page.generated_data as any;

    if (generatedData && params) {
      const index = generatedData.findIndex((item: any) => {
        return item._id === params;
      });

      const data = traverseField(generatedData[index], status_field);
      setStatus(data);
    }
  }, [params]);
  // useEffect(() => {
  // }, [status_field]);

  return (
    <div className="flex gap-2 justify-center items-center">
      <span className="label">Status:</span>
      <span
        className={`${classesMap[status]} text-sm font-medium px-2.5 py-0.5 rounded`}
      >
        {status}
      </span>
    </div>
  );
}

export default DocumentStatus;
