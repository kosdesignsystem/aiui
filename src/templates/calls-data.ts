export type CallDirection = "incoming" | "outgoing" | "missed";

export type CallRecord = {
  id: string;
  title: string;
  subtitle: string;
  group: "Сегодня" | "Ранее";
  direction: CallDirection;
};

export const callGroupOrder: Array<CallRecord["group"]> = ["Сегодня", "Ранее"];

const callRecordsSeed: CallRecord[] = [
  {
    id: "today-1",
    title: "+7 927 238-80-22 (3)",
    subtitle: "23:04",
    group: "Сегодня",
    direction: "incoming",
  },
  {
    id: "today-2",
    title: "Константин Петрович (2)",
    subtitle: "22:00",
    group: "Сегодня",
    direction: "outgoing",
  },
  {
    id: "today-3",
    title: "+7 931 342-60-31",
    subtitle: "14:02",
    group: "Сегодня",
    direction: "missed",
  },
  {
    id: "earlier-1",
    title: "Дмитрий Бурдыко",
    subtitle: "18 сентября, 23:04",
    group: "Ранее",
    direction: "incoming",
  },
  {
    id: "earlier-2",
    title: "Константин Петрович П.",
    subtitle: "18 сентября, 22:12",
    group: "Ранее",
    direction: "incoming",
  },
  {
    id: "earlier-3",
    title: "Константин Петрович П.",
    subtitle: "18 сентября, 19:38",
    group: "Ранее",
    direction: "incoming",
  },
  {
    id: "earlier-4",
    title: "Дмитрий Бурдыко",
    subtitle: "16 сентября, 23:04",
    group: "Ранее",
    direction: "incoming",
  },
  {
    id: "earlier-5",
    title: "Константин Петрович П.",
    subtitle: "16 сентября, 22:12",
    group: "Ранее",
    direction: "incoming",
  },
];

export function createCallRecords(): CallRecord[] {
  return callRecordsSeed.map((record) => ({ ...record }));
}
