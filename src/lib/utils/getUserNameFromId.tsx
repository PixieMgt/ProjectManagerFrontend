import { searchUserById } from "../api/users";

export default async function getUserNameFromId(id: number, token: string) {
  const user = await searchUserById(id, token);
  return user?.name;
}
