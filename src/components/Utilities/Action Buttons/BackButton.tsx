"use client";
import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <button
      className="btn-tiny"
      aria-label="Menu"
      onClick={() => router.back()}
    >
      <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
      Back
    </button>
  );
}

export default BackButton;
