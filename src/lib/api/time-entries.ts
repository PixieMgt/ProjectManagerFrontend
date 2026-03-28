const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserTimeEntries(userId: number, token: string) {
  if (!userId || !token) return;
  const res = await fetch(`${API_URL}/users/${userId}/time-entries`, {
    method: "GET",
    credentials: "include",
    headers: { Authorization: token },
  });

  if (res.status === 404) return;

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getUserTimeEntries failed");
  }

  const json = await res.json();

  return json.timeEntries;
}

export async function createTimeEntry(data: any, token: string) {
  if (!data || !token) return;
  const res = await fetch(`${API_URL}/time-entries`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      ...data,
      taskId: Number(data.taskId),
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "createTimeEntry failed");
  }

  return res.json();
}

export async function updateTimeEntry(
  timeEntryId: number,
  data: any,
  token: string,
) {
  if (!timeEntryId || !data || !token) return;
  const res = await fetch(`${API_URL}/time-entries/${timeEntryId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      ...data,
      taskId: Number(data.taskId),
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "updateTimeEntry failed");
  }

  return res.json();
}

export async function deleteTimeEntry(timeEntryId: number, token: string) {
  if (!timeEntryId || !token) return;
  const res = await fetch(`${API_URL}/time-entries/${timeEntryId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "deleteTimeEntry failed");
  }

  return res.json();
}
