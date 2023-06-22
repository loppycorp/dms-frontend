"use client";
import React, { useState } from "react";
import {
  DocumentDuplicateIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import FormModal from "@/components/Forms/FormModal";
import { useFormContext } from "@/context/FormContext";
import Link from "next/link";
import useQueryParams from "@/utils/use-query-params";
import DeleteModal from "@/components/Forms/DeleteModal";
import CompleteModal from "@/components/Forms/CompleteModal";

function ActionButtons(props: {
  component: ButtonModalElement;
  page: PageItem;
  index: number;
  id: number;
}) {
  const [showDuplicateForm, setShowDuplicateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const { duplicateValues, pageData } = useFormContext();
  const { getLinkWithParams } = useQueryParams();

  function duplicateForm() {
    setShowDuplicateForm(true);
    duplicateValues(props.index);
  }

  return (
    <>
      <div className="flex gap-4 justify-center">
        <Link href={getLinkWithParams({ item: props.id })}>
          <PencilSquareIcon className="w-5 hover:scale-150" />
        </Link>
        {/* <DocumentDuplicateIcon
          className="w-5 hover:scale-150 hover:cursor-pointer"
          onClick={() => duplicateForm()}
        /> */}
        <TrashIcon
          className="w-5 hover:scale-150 hover:cursor-pointer"
          onClick={() => setShowDeleteForm(true)}
        />
        <DocumentCheckIcon
          className="w-5 hover:scale-150 hover:cursor-pointer"
          onClick={() => setShowCompleteForm(true)}
        />
      </div>

      <FormModal
        show={showDuplicateForm}
        setShow={setShowDuplicateForm}
        page={props.page}
        button={props.component.button}
      />

      <DeleteModal
        show={showDeleteForm}
        setShow={setShowDeleteForm}
        page={props.page}
        id={props.id}
      />
      <CompleteModal
        show={showCompleteForm}
        setShow={setShowCompleteForm}
        page={props.page}
        id={props.id}
      />
    </>
  );
}

export default ActionButtons;
