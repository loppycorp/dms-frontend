"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ComponentProps } from "@/components/RenderComponent/RenderComponent";

const DateRangePicker = (props: ComponentProps) => {
  const selectedField = props.context.value(props.inputProps);

  const [startDate, setStartDate] = useState(
    // new Date(props.inputProp.value.from)
    selectedField?.from ? new Date(selectedField.from) : new Date()
  );
  const [endDate, setEndDate] = useState(
    // new Date(props.inputProp.value.to)
    selectedField?.to ? new Date(selectedField.to) : new Date()
  );

  useEffect(() => {
    const value = {
      from: startDate.toISOString(),
      to: endDate.toISOString(),
    };
    props.context.setValue(props.inputProps, value);
  }, [startDate, endDate]);

  return (
    <div className="flex gap-2 justify-center items-center">
      <DatePicker
        className="input"
        selected={startDate}
        // @ts-ignore
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <div className="text-sm">-</div>
      <DatePicker
        className="input"
        selected={endDate}
        // @ts-ignore
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </div>
  );
};

export default DateRangePicker;
