"use client";

import ClientModal from "@/components/ui/modal/client/ClientModal";
import ProjectMemberModal from "@/components/ui/modal/project-member/ProjectMemberModal";
import ProjectModal from "@/components/ui/modal/project/ProjectModal";
import TaskModal from "@/components/ui/modal/task/TaskModal";
import TimeEntryModal from "@/components/ui/modal/time-entry/TimeEntryModal";
import React, { createContext, useRef, useState } from "react";

export const modalMap = {
  none: null,
  project: ProjectModal,
  client: ClientModal,
  task: TaskModal,
  timeEntry: TimeEntryModal,
  projectMember: ProjectMemberModal,
};

export type ModalType = keyof typeof modalMap;
export type ModalMode = "none" | "read" | "create" | "update" | "delete";

type ModalContextType = {
  shown: boolean;
  type: ModalType;
  mode: ModalMode;
  data: any;
  openModal: ({
    type,
    mode,
    data,
    onClose,
  }: {
    type: ModalType;
    mode: ModalMode;
    data?: any;
    onClose?: () => void | Promise<void>;
  }) => void;
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
  const onCloseRef = useRef<(() => void | Promise<any>) | undefined>(undefined);

  function openModal({
    type,
    mode,
    data,
    onClose,
  }: {
    type: ModalType;
    mode: ModalMode;
    data?: any;
    onClose?: () => void | Promise<void>;
  }) {
    setShown(true);
    setType(type);
    setMode(mode);
    setData(data);
    if (onClose) onCloseRef.current = onClose;
  }

  async function closeModal() {
    const callBack = onCloseRef.current;
    onCloseRef.current = undefined;
    callBack && (await callBack());

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
