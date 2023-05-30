"use client";
import React, { useState } from "react";
import {
  DocumentDuplicateIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import FormModal from "@/components/Forms/FormModal";
import { useFormContext } from "@/context/FormContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function ActionButtons(props: {
  component: ButtonModalElement;
  page: PageItem;
  index: number;
  id: string;
}) {
  let [show, setShow] = useState(false);
  let context = useFormContext();

  const pathName = usePathname();

  function duplicateForm() {
    setShow(true);
    context.duplicateValues(props.index);
  }

  return (
    <>
      <div className="flex gap-4 justify-center">
        <Link href={pathName?.concat("?item=", props.id) || ""}>
          <PencilSquareIcon className="w-5 hover:scale-150"></PencilSquareIcon>
        </Link>
        <DocumentDuplicateIcon
          className="w-5 hover:scale-150 hover:cursor-pointer"
          onClick={() => duplicateForm()}
        ></DocumentDuplicateIcon>
        {/*<TrashIcon className="w-5 hover:scale-150"></TrashIcon>*/}
      </div>

      <FormModal
        show={show}
        setShow={setShow}
        page={props.page}
        button={props.component.button}
      ></FormModal>
    </>
  );
}

export default ActionButtons;
