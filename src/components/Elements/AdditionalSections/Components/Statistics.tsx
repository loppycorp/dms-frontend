import React, { useEffect, useState } from "react";
import { AdditionalSectionProps } from "@/components/Elements/AdditionalSections/AdditionalSection";
import { useFormContext } from "@/context/FormContext";

function Statistics(props: AdditionalSectionProps) {
  const { data } = props.component;
  const { pageData } = useFormContext();
  const [stats, setStats] = useState<any>();

  useEffect(() => {
    if (pageData) {
      setStats((pageData.pagination as any)[data]);
    }
  }, [pageData]);

  return (
    <div className="flex gap-2 justify-center items-center my-20">
      <div className="flex h-60 gap-1 w-full">
        <div className="bg-primary flex-1 rounded-l-2xl">
          <div className="flex text-light text-6xl py-10 px-10">
            {stats?.pending}
          </div>
          <div className="flex text-light text-2xl px-10">Pending Requests</div>
        </div>
        <div className="bg-primary flex-1">
          <div className="flex text-light text-6xl py-10 px-10">
            {stats?.ongoing}
          </div>
          <div className="flex text-light text-2xl px-10">Ongoing Requests</div>
        </div>
        <div className="bg-primary flex-1  rounded-r-2xl">
          <div className="flex text-light text-6xl py-10 px-10">
            {stats?.complete}
          </div>
          <div className="flex text-light text-2xl px-10">
            Complete Requests
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
