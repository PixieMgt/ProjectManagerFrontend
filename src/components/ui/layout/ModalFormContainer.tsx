import { SubmitEvent } from "react";

export default function ModalFormContainer({
  onSubmit,
  children,
}: Readonly<{
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <form
        id="modal-form"
        onSubmit={onSubmit}
        className="grid grid-cols-2 px-16 text-start"
      >
        {children}
      </form>
      <button
        type="submit"
        form="modal-form"
        className="hover:cursor-pointer mt-auto mb-8 underline"
      >
        Save
      </button>
    </div>
  );
}
