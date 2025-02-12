import React, { useState, useTransition } from "react";
import Modal from "@/components/Utilities/Modal/Modal";
import { useSession } from "next-auth/react";
import AlertList from "@/components/Alerts/AlertList";
import { useFormContext } from "@/context/FormContext";
import { CheckIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";
import { park } from "@/helpers/api/form-handler";
import FormItemsJSON from "./FormItemsJSON";
import RenderComponent from "@/components/RenderComponent/RenderComponent";

function ParkModal(props: {
  show: boolean;
  setShow: (e: boolean) => void;
  page: PageItem;
  button: ButtonElement;
}) {
  const { data: session } = useSession();
  let context = useFormContext();
  const [errors, setErrors] = useState([] as any);
  const item_id = useSearchParams()?.get("item") || "";
  const fields = Object.keys(props.button.fields);
  const [fieldValues, setFieldValues] = useState<any>({});

  let [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setErrors([]);
    startTransition(() => {
      park(session, props.page.api_url, fieldValues, item_id).then((res) => {
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
        Save
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
      {fields.map((fieldName, colIndex) => (
        <RenderComponent
          key={fieldName}
          componentProps={{
            context: context,
            component: props.button.fields[fieldName],
            session: session,
            componentName: fieldName,
            editable: true,
            value: fieldValues[fieldName],
            setValue: (e) =>
              setFieldValues((prevState: any) => ({
                ...prevState,
                [fieldName]: e,
              })),
          }}
        />
      ))}
      <div className="ml-4 mr-5">
        {errors?.length > 0 && <AlertList data={errors} />}
        Save the transaction?
      </div>
    </Modal>
  );
}

export default ParkModal;
