import { ChangeEvent, HTMLInputTypeAttribute } from "react";

export default function ModalFormInput({
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  type: HTMLInputTypeAttribute;
  label: string;
  name: string;
  placeholder?: string | number;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex border-1 m-2 p-2 rounded-lg">
      <p className="w-[25%]">{label}</p>
      <input
        name={name}
        type={type}
        placeholder={placeholder?.toString()}
        value={value}
        onChange={onChange}
        className="w-[75%] ml-2 border-b-1"
      />
    </div>
  );
}
