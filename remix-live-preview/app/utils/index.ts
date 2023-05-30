export function parseDate(dt?: string | null): Date | null {
  if (dt != null) {
    try {
      return new Date(dt);
    } catch (ex) {}
  }
  return null;
}

export function formatDate(dt?: Date | null): string | null {
  if (dt == null) return null;

  const a = [
    //dt.getFullYear(),
    '-',
    (dt.getMonth() + 1).toString().padStart(2, '0'),
    '-',
    dt.getDate().toString().padStart(2, '0'),
  ];

  return a.join();
}

export function formatStringDate(dateStr?: string | null): string | null {
  if (dateStr == null) return null;

  const dt = parseDate(dateStr);
  if (!dt) return null;

  const a = [
    dt.getFullYear(),
    '-',
    (dt.getMonth() + 1).toString().padStart(2, '0'),
    '-',
    dt.getDate().toString().padStart(2, '0'),
  ];

  return a.join("");
}
