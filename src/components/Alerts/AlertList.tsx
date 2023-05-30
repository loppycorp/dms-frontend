import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function AlertList(props: { data: any[] }) {
  return (
    <div>
      <div
        className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-light-darker"
        role="alert"
      >
        <ExclamationCircleIcon className="flex-shrink-0 inline w-5 h-5 mr-3" />
        <span className="sr-only">Danger</span>
        <div>
          <span className="font-medium">Please fix the following errors:</span>
          <ul className="mt-1.5 ml-4 list-disc list-inside">
            {props.data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AlertList;
