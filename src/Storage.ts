const LS_KEY = "@THE_ROAD_QUIZ";

export class Storage {
  static persist(value: Object) {
    localStorage.setItem(LS_KEY, JSON.stringify(value));
  }

  static read<T>(defaultValue: T): T {
    const value = localStorage.getItem(LS_KEY);
    return value !== null ? JSON.parse(value) : defaultValue;
  }
}
