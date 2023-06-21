"use client";
import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import FormModal from "@/components/Forms/FormModal";
import { useFormContext } from "@/context/FormContext";
import Link from "next/link";
import useQueryParams from "@/utils/use-query-params";
import DeleteModal from "@/components/Forms/DeleteModal";

function ActionButtons(props: {
  component: ButtonModalElement;
  page: PageItem;
  index: number;
  id: number;
}) {
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const { getLinkWithParams } = useQueryParams();

  return (
    <>
      <div className="flex gap-4 justify-center">
        <Link href={getLinkWithParams({ item: props.id })}>
          <PencilSquareIcon className="w-5 hover:scale-150" />
        </Link>
        <TrashIcon
          className="w-5 hover:scale-150 hover:cursor-pointer"
          onClick={() => setShowDeleteForm(true)}
        />
      </div>

      <DeleteModal
        show={showDeleteForm}
        setShow={setShowDeleteForm}
        page={props.page}
        id={props.id}
      />
    </>
  );
}

export default ActionButtons;
