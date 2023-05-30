import React, { useEffect, useState } from "react";
import { AdditionalSectionProps } from "@/components/Elements/AdditionalSections/AdditionalSection";
import { traverseField } from "@/utils/helpers";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

function AmountInformation(props: AdditionalSectionProps) {
  const { table_field, credit_posting_key, debit_posting_key } =
    props.component;

  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);
  useEffect(() => {
    const tableFields = traverseField(props.context.formValues, table_field);
    if (tableFields?.length > 0) {
      const amounts = tableFields.reduce(
        (
          accumulator: { debitTotal: number; creditTotal: number },
          current: any
        ) => {
          if (current.transaction_type?.posting_key_code == debit_posting_key) {
            accumulator.debitTotal += parseFloat(current.amount) || 0;
          } else if (
            current.transaction_type?.posting_key_code == credit_posting_key
          ) {
            accumulator.creditTotal += parseFloat(current.amount) || 0;
          }
          return accumulator;
        },
        { debitTotal: 0, creditTotal: 0 }
      );

      setDebit(amounts?.debitTotal);
      setCredit(amounts?.creditTotal);
      // setCredit(tableFields[1].amount);
    }
  }, [props.context.formValues]);
  return (
    <div className="mx-auto max-w-screen-xl">
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col rounded-lg bg-light-lighter p-6 text-center">
          <dt className="order-last label">Total Debit</dt>

          <dd className="text-3xl font-extrabold text-primary md:text-4xl">
            {debit}
          </dd>
        </div>

        <div className="flex flex-col rounded-lg bg-light-lighter p-6 text-center">
          <dt className="order-last label">Total Credit</dt>

          <dd className="text-3xl font-extrabold text-primary md:text-4xl">
            {credit}
          </dd>
        </div>

        <div className="flex flex-col rounded-lg bg-light-lighter p-6 text-center">
          <dt className="order-last label">Balanced</dt>

          <dd className="text-3xl font-extrabold md:text-4xl flex justify-center">
            {debit - credit == 0 && credit != 0 ? (
              <CheckCircleIcon className="w-10 text-green-600" />
            ) : (
              <XCircleIcon className="w-10 text-primary" />
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default AmountInformation;
