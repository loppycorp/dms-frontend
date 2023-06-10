import React, { useState, useTransition } from "react";
import FormSectionsJSON from "@/components/Elements/Containers/FormSection/FormSectionsJSON";
import Modal from "@/components/Utilities/Modal/Modal";
import { useSession } from "next-auth/react";
import AlertList from "@/components/Alerts/AlertList";
import { useFormContext } from "@/context/FormContext";
import FormItemsJSON from "@/components/Forms/FormItemsJSON";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { createItem } from "@/helpers/api/form-handler";

function FormModal(props: {
  show: boolean;
  setShow: (e: boolean) => void;
  page: PageItem;
  button: ButtonElement;
}) {
  const { data: session } = useSession();
  const context = useFormContext();
  const data = context.getData();
  const [errors, setErrors] = useState([] as any);
  let [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setErrors([]);
    startTransition(() => {
      createItem(data, session, props.page.api_url).then((res) => {
        if (res.status == "success") {
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
        Create
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
      <div className="text-base font-semibold leading-6 text-gray-900 mb-3 ml-3">
        {props.button.label}
      </div>
      {errors?.length > 0 && <AlertList data={errors} />}
      <FormItemsJSON items={props.page.json_data} session={session} />
    </Modal>
  );
}

export default FormModal;
