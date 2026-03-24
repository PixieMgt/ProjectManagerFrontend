"use client";

import ClientModal from "@/components/ui/modal/client/ClientModal";
import ProjectModal from "@/components/ui/modal/project/ProjectModal";
import TaskModal from "@/components/ui/modal/task/TaskModal";
import TimeEntryModal from "@/components/ui/modal/time-entry/TimeEntryModal";
import React, { createContext, useState } from "react";

export const modalMap = {
  none: null,
  project: ProjectModal,
  client: ClientModal,
  task: TaskModal,
  timeEntry: TimeEntryModal,
};

export type ModalType = keyof typeof modalMap;
export type ModalMode = "none" | "read" | "create" | "update";

type ModalContextType = {
  shown: boolean;
  type: ModalType;
  mode: ModalMode;
  data: any;
  openModal: (type: ModalType, mode: ModalMode, data?: any) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [shown, setShown] = useState<boolean>(false);
  const [type, setType] = useState<ModalType>("none");
  const [mode, setMode] = useState<ModalMode>("none");
  const [data, setData] = useState<any>(null);

  function openModal(type: ModalType, mode: ModalMode, data?: any) {
    setShown(true);
    setType(type);
    setMode(mode);
    setData(data);
  }

  function closeModal() {
    setShown(false);
    setType("none");
    setMode("none");
    setData(null);
  }

  return (
    <ModalContext.Provider
      value={{ shown, type, mode, data, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
