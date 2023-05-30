"use client";
import RouteHandler from "@/utils/route-handler";
import { CheckIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "@/context/FormContext";
import http from "@/lib/http";
import { Session } from "next-auth";
import React, { useState, useTransition } from "react";
import AlertList from "@/components/Alerts/AlertList";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import Modal from "@/components/Utilities/Modal/Modal";
import { updateItem } from "@/helpers/api/form-handler";

function WindowContent({
  children,
  title,
  session,
  api,
}: {
  children: React.ReactNode;
  title: string;
  session: Session | null;
  api: string;
}) {
  const route = RouteHandler({ url: title });
  const context = useFormContext();
  const [errors, setErrors] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);
  let [isPending, startTransition] = useTransition();
  const item_id = useSearchParams()?.get("item") || "";

  if (route.params != route.slug || !session) return <></>;

  function handleSubmit() {
    const data = context.getData();
    setErrors([]);
    setSuccess(false);
    startTransition(() => {
      updateItem(data, session, api, item_id).then((res) => {
        if (res.status == "success") {
          // props.setShow(false);
          //   TODO: Success Prompt
          setSuccess(true);
        } else {
          if (res.error) {
            setErrors(
              res.error.map((item: any) => {
                return item.message;
              })
            );
          } else {
            setErrors([res.message]);
          }
        }
      });
    });
  }
  const formButtons = (
    <button
      type="button"
      className="btn-primary w-full sm:w-auto"
      onClick={() => setSuccess(false)}
    >
      Close
    </button>
  );

  return (
    <>
      {errors.length > 0 && <AlertList data={errors} />}
      {children}
      <div className="flex gap-2 justify-end">
        {isPending && <LoadingSpinner />}
        <button
          className="btn-primary mb-2"
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
        >
          <CheckIcon className="w-4" />
          Save
        </button>
      </div>
      <Modal
        show={success}
        setShow={setSuccess}
        icon={<DocumentCheckIcon />}
        buttons={formButtons}
      >
        <div className="text-base font-semibold leading-6 text-gray-900 mb-3 ml-3">
          Saved
        </div>
        <div className="flex flex-wrap ml-4 mr-5">
          Item {item_id} successfully updated.
        </div>
      </Modal>
    </>
  );
}

export default WindowContent;
