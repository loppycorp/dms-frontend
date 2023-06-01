"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

function LoginButton(props: { isLoggedIn: boolean; replaceText?: string }) {
  const [loading, setLoading] = useState(false);

  if (!props.isLoggedIn) return <></>;
  return (
    <>
      <button
        className="btn-primary"
        onClick={() => {
          setLoading(true);
          signOut({ callbackUrl: "/" });
        }}
        disabled={loading}
      >
        {props.replaceText ? props.replaceText : "Logout"}
      </button>
    </>
  );
}

export default LoginButton;
