import { AxiosInstance } from "axios";

export interface ExtraArgument {
  api: AxiosInstance;
  navigate: (path: string) => void;
}
