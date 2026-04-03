import { ChangeEvent, useState } from "react";
import SearchButton from "./SearchButton";
import { useAuth } from "@/hooks/useAuth";
import { searchUserByEmail } from "@/lib/api/calls/users";
import { User } from "@/lib/api/models/user";

export default function ModalFormSearchProjectMember({
  name,
  label,
  searchValue,
  result,
  setResult,
  onChange,
}: {
  name: string;
  label: string;
  searchValue: string;
  result: number;
  setResult: (result: number) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const { token } = useAuth();
  const [searchResult, setSearchResult] = useState<User | null>(null);

  async function submitSearchUser() {
    const { user } = await searchUserByEmail(searchValue, token);
    if (!user) return;
    setSearchResult(user);
    setResult(user?.id);
  }

  return (
    <div className="flex flex-col border-1 m-2 p-2 rounded-lg">
      <div className="flex">
        <p className="w-[25%]">{label}</p>
        <input
          name={name}
          value={searchValue}
          onChange={onChange}
          className="w-[75%] ml-2 border-b-1"
        />
        <SearchButton
          onClick={submitSearchUser}
          color="black"
          className="w-8 h-8"
        />
      </div>
      <div className="flex mt-4">
        <p className="w-[25%]">Result</p>
        <p className="w-[75%] border-b-1">{searchResult?.name}</p>
      </div>
    </div>
  );
}
