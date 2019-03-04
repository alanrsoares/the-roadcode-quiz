const LS_KEY = "@THE_ROAD_QUIZ";

export class Storage {
  static persist<T extends {}>(value: T) {
    localStorage.setItem(LS_KEY, JSON.stringify(value));
  }

  static read<T extends {}>(defaultValue: T): T {
    const value = localStorage.getItem(LS_KEY);
    return value !== null ? JSON.parse(value) : defaultValue;
  }
}
