type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __WEATHER_API__: string;
declare const __CURRENCY_API__: string;
