import { TimeEntry } from "../models/timeEntry";
import { normalizeTimeEntry } from "../normalizers/normalizeTimeEntry";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTimeEntry(timeEntryId: number, token: string) {
  const result = {
    timeEntry: null,
  };

  if (!timeEntryId || !token) return result;

  const res = await fetch(`${API_URL}/time-entries/${timeEntryId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getTimeEntry failed");
  }

  const json = await res.json();
  return {
    timeEntry: json.timeEntry ? normalizeTimeEntry(json.timeEntry) : null,
  };
}

export async function getUserTimeEntries(userId: number, token: string) {
  const result = {
    timeEntries: null,
  };

  if (!userId || !token) return result;

  const res = await fetch(`${API_URL}/users/${userId}/time-entries`, {
    method: "GET",
    credentials: "include",
    headers: { Authorization: token },
  });

  if (res.status === 404) return result;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "getUserTimeEntries failed");
  }

  const json = await res.json();
  return {
    timeEntries: json.timeEntries
      ? json.timeEntries.map((te: TimeEntry) => normalizeTimeEntry(te))
      : null,
  };
}

export async function createTimeEntry(data: any, token: string) {
  if (!data || !token) return null;

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
  if (!timeEntryId || !data || !token) return null;

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

  if (res.status === 404) return null;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "updateTimeEntry failed");
  }

  return res.json();
}

export async function deleteTimeEntry(timeEntryId: number, token: string) {
  if (!timeEntryId || !token) return null;

  const res = await fetch(`${API_URL}/time-entries/${timeEntryId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "deleteTimeEntry failed");
  }

  return res.json();
}
