"use client";

import React from "react";
import dynamic from "next/dynamic";

const AutoContactDrawer = dynamic(() => import("@/components/AutoContactDrawer"), {
  ssr: false,
});

const DualConvergeModal = dynamic(() => import("@/components/DualConvergeModal"), {
  ssr: false,
});

export default function DeferredHomeModals() {
  return (
    <>
      <AutoContactDrawer />
      <DualConvergeModal />
    </>
  );
}
