"use client";
import { useState } from "react";
import FormModal from "@/components/Forms/FormModal";
import { useFormContext } from "@/context/FormContext";
import { Session } from "next-auth";
import ButtonElement from "@/components/Fields/Buttons/ButtonElement";
import {
  FunctionMap,
  park,
  showCreateForm,
  simulate,
} from "@/components/Fields/Buttons/ButtonFunctions";
import SimulateModal from "@/components/Forms/SimulateModal";
import ParkModal from "@/components/Forms/ParkModal";

export type ModalProps = {
  show: boolean;
  setShow: (e: boolean) => void;
  page: PageItem;
  button: ButtonElement;
};
export interface ModalMap {
  [key: string]: React.FC<ModalProps>;
}

function ButtonModalElement(props: {
  component: ButtonModalElement;
  page: PageItem;
  api: string;
  session: Session | null;
  buttonClasses?: string | null;
}) {
  let [show, setShow] = useState(false);
  let context = useFormContext();
  let button = props.component.button;

  const functionMap: FunctionMap = {
    park: park,
    showCreateForm: showCreateForm,
    simulate: simulate,
  };

  const modalData: ModalMap = {
    showCreateForm: FormModal,
    simulate: SimulateModal,
    park: ParkModal,
  };

  const ModalComponent = modalData[button.method_name];

  return (
    <>
      <ButtonElement
        component={button}
        buttonClasses={props.buttonClasses}
        onClick={() => functionMap[button.method_name](context, setShow)}
      />
      {ModalComponent && (
        <ModalComponent
          show={show}
          setShow={setShow}
          page={props.page}
          button={props.component.button}
        />
      )}
    </>
  );
}

export default ButtonModalElement;
