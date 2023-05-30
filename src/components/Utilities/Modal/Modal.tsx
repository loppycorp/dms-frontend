import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";

type ModalType = {
  show: boolean;
  setShow: (val: boolean) => void;
  children: React.ReactNode;
  buttons?: React.ReactNode;
  icon: React.ReactNode;
};

const Modal = (props: ModalType) => {
  return (
    <Transition.Root show={props.show}>
      <Dialog className="relative z-50" onClose={props.setShow}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                <div className="bg-white pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light-lighter sm:mx-0 sm:h-10 sm:w-10">
                      {props.icon}
                    </div>
                    <div className="text-center sm:ml-2 sm:mt-0 sm:text-left w-full md:w-11/12">
                      {props.children}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col sm:flex-row-reverse sm:px-6 gap-2 bg-neutral-50">
                  {props.buttons}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
