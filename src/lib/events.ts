export type EventNotice = {
  id: string;
  updated: string;
  when: string;
  body: string;
};

/** Newest first. Shared by /event and homepage what’s new. */
export const eventNotices: EventNotice[] = [
  {
    id: "c104",
    updated: "2026.09.20",
    when: "2026.12.29–12.31",
    body: "コミックマーケット。当選したら原神島・創作男子予定。",
  },
  {
    id: "group-2027",
    updated: "2026.09.20",
    when: "2027年頭",
    body: "グループ展予定。詳細な会場などは後々記載。",
  },
  {
    id: "comitia-2027-03",
    updated: "2026.09.20",
    when: "2027年03月",
    body: "COMITIA。参加予定。当選したら漫画を出す予定です。",
  },
];

export function latestEventNotices(limit = 3) {
  return eventNotices.slice(0, limit);
}
