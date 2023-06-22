import React, { useState, useTransition } from "react";
import Modal from "@/components/Utilities/Modal/Modal";
import { useSession } from "next-auth/react";
import AlertList from "@/components/Alerts/AlertList";
import { useFormContext } from "@/context/FormContext";
import {
  CheckIcon,
  DocumentCheckIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { completeItem } from "@/helpers/api/form-handler";

function DeleteModal(props: {
  show: boolean;
  setShow: (e: boolean) => void;
  page: PageItem;
  id: number;
}) {
  const { data: session } = useSession();
  const { refreshData } = useFormContext();
  const [errors, setErrors] = useState([] as any);
  let [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setErrors([]);
    startTransition(() => {
      completeItem(session, props.page.api_url, props.id).then((res) => {
        console.log(props);
        if (res.status == "success") {
          props.setShow(false);
          refreshData();
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
        <DocumentCheckIcon className="w-4" />
        Completed
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
      icon={<CheckIcon className={"w-5"} />}
      buttons={formButtons}
    >
      <div className="text-base font-semibold leading-6 text-gray-900 mb-3 ml-3">
        Complete Ticket
      </div>
      <div className="ml-4 mr-5">
        {errors?.length > 0 && <AlertList data={errors} />}
        Click <b>Complete</b> button to confirm.
        <div>Item ID: {props.id}.</div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
