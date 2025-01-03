import { GridLoader } from "react-spinners";
import styles from "./Loader.module.scss";
import { cn } from "@/shared/lib";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return <GridLoader className={cn(styles.wrapper, className)} />;
};