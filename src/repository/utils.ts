export function sortByDate<T extends { date: string }>(data: T[]): T[] {
    return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  