"use client";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { UserIcon } from "@heroicons/react/20/solid";
function ProfileMenu(props: { session: Session | null }) {
  if (!props.session) return <></>;
  const first_name = props.session?.user?.data.first_name;
  const last_name = props.session?.user?.data.last_name;
  const email = props.session?.user?.data.email;
  return (
    <Menu as="div" className="relative ml-3 pointer-events-auto">
      <div>
        <Menu.Button className="flex rounded-full text-sm bg-light-darker hover:bg-light-lighter">
          <span className="sr-only">Open user menu</span>
          <UserIcon className="h-9 w-9 text-primary" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <div className="block text-sm text-gray-900">
              <span className="capitalize">{first_name} </span>
              <span className="capitalize">{last_name}</span>
            </div>
            <span className="block text-sm text-gray-500 truncate">
              {email}
            </span>
          </div>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`block px-4 py-2 text-sm text-gray-700 ${
                  active && "bg-gray-100"
                }`}
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ProfileMenu;
