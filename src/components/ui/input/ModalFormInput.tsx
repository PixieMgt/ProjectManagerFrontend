import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type ModalFormInputType = "textShort" | "textLong" | "number" | "date" | "time";

export default function ModalFormInput({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  type: ModalFormInputType;
  label: string;
  name: string;
  placeholder?: string | number;
  value: string | number;
  onChange: (e: ChangeEvent<any>) => void;
}) {
  return (
    <div
      className={`flex border-1 m-2 p-2 rounded-lg ${type === "textLong" && "row-span-2"}`}
    >
      <p className="w-[25%]">{label}</p>
      {type === "textLong" ? (
        <textarea
          name={name}
          placeholder={placeholder?.toString()}
          value={value}
          onChange={onChange}
          className="w-[75%] ml-2 border-b-1 resize-none"
        />
      ) : (
        <input
          name={name}
          type={type === "textShort" ? "text" : type}
          placeholder={placeholder?.toString()}
          value={value}
          onChange={onChange}
          className="w-[75%] ml-2 border-b-1"
        />
      )}
    </div>
  );
}
