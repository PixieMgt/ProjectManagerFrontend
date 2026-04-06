import { SubmitEvent } from "react";

export default function ModalFormContainer({
  errorMessage,
  onSubmit,
  children,
}: Readonly<{
  errorMessage: string;
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
      <p
        className="text-center text-red-500"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {errorMessage}
      </p>
      <div className="w-full">
        <button
          type="submit"
          form="modal-form"
          className="block mx-auto mt-8 mb-8 text-2xl hover:cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}
