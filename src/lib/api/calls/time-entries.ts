import { TimeEntry } from "../models/timeEntry";
import {
  TimeEntryListResponse,
  TimeEntryResponse,
} from "../responses/TimEntryResponses";
import fetchAPI from "../../utils/fetchAPI";
import { normalizeTimeEntry } from "../normalizers/normalizeTimeEntry";

export async function getTimeEntry(timeEntryId: number, token: string) {
  return await fetchAPI<TimeEntryResponse>(
    `/time-entries/${timeEntryId}`,
    "GET",
    token,
    (res) => ({
      timeEntry: res.timeEntry ? normalizeTimeEntry(res.timeEntry) : null,
    }),
  );
}

export async function getUserTimeEntries(userId: number, token: string) {
  return await fetchAPI<TimeEntryListResponse>(
    `/users/${userId}/time-entries`,
    "GET",
    token,
    (res) => ({
      timeEntries: res.timeEntries
        ? res.timeEntries.map((te: TimeEntry) => normalizeTimeEntry(te))
        : null,
    }),
  );
}

export async function createTimeEntry(data: any, token: string) {
  return await fetchAPI(`/time-entries`, "POST", token, undefined, {
    ...data,
    taskId: Number(data.taskId),
  });
}

export async function updateTimeEntry(
  timeEntryId: number,
  data: any,
  token: string,
) {
  return await fetchAPI(
    `/time-entries/${timeEntryId}`,
    "PATCH",
    token,
    undefined,
    {
      ...data,
      taskId: Number(data.taskId),
    },
  );
}

export async function deleteTimeEntry(timeEntryId: number, token: string) {
  return await fetchAPI(`/time-entries/${timeEntryId}`, "DELETE", token);
}
