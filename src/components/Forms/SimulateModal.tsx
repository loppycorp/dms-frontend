import React, { useState, useTransition } from "react";
import Modal from "@/components/Utilities/Modal/Modal";
import { useSession } from "next-auth/react";
import AlertList from "@/components/Alerts/AlertList";
import { useFormContext } from "@/context/FormContext";
import http from "@/lib/http";
import RenderSimulateItems from "@/components/Forms/RenderSimulateItems";
import { CheckIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";
import { simulate } from "@/helpers/api/form-handler";

function SimulateModal(props: {
  show: boolean;
  setShow: (e: boolean) => void;
  page: PageItem;
  button: ButtonElement;
}) {
  const { data: session } = useSession();
  let context = useFormContext();
  const [errors, setErrors] = useState([] as any);
  const item_id = useSearchParams()?.get("item") || "";
  let [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setErrors([]);
    startTransition(() => {
      simulate(session, props.page.api_url, item_id).then((res) => {
        if (res.status == "success") {
          location.reload();
          props.setShow(false);
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
    <>
      {isPending && <LoadingSpinner />}
      <button
        type="button"
        className="btn-primary w-full sm:w-auto"
        disabled={isPending}
        onClick={handleSubmit}
      >
        <CheckIcon className="w-4" />
        Approved
      </button>
      <button
        type="button"
        className="btn-primary w-full sm:w-auto"
        disabled={isPending}
        onClick={handleSubmit}
      >
        <CheckIcon className="w-4" />
        Declined
      </button>
      <button
        type="button"
        className="btn w-full sm:w-auto"
        onClick={() => props.setShow(false)}
      >
        Cancel
      </button>
    </>
  );

  return (
    <Modal
      show={props.show}
      setShow={props.setShow}
      icon={<div dangerouslySetInnerHTML={{ __html: props.button.icon }} />}
      buttons={formButtons}
    >
      <div className="text-base font-semibold leading-6 text-gray-900 mb-7 ml-7">
        {props.button.label}
      </div>
      <div className="ml-7 mr-7">
        {errors?.length > 0 && <AlertList data={errors} />}
        {Object.entries(props.page.json_data).map(([componentName, value]) => {
          if (componentName)
            return (
              <RenderSimulateItems
                items={props.page.json_data}
                session={session}
                key={componentName}
              />
            );
          const formSectionsArray = Object.entries(value as object);

          return formSectionsArray.map(([componentName, value]) => {
            if (typeof value != "object") {
              throw new Error(`Not a section type: ${componentName}`);
            }
            return (
              <div className={`w-full`} key={componentName}>
                <div className="flex flex-wrap">
                  <RenderSimulateItems items={value} session={session} />
                </div>
              </div>
            );
          });
        })}
      </div>
    </Modal>
  );
}

export default SimulateModal;
