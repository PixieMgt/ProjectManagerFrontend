export default function AuthInputField({
  label,
  placeholder,
  value,
  setValue,
  isPassword,
}: {
  label: string;
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isPassword?: boolean;
}) {
  return (
    <div className="my-4 w-full">
      <label className="inline-block w-[25%]">{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="inline-block border-b-1 w-[75%]"
        type={isPassword ? "password" : "text"}
      />
    </div>
  );
}
