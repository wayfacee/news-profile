import { Loader } from "@/shared/ui/Loader";
import { useLocation } from "react-router-dom";

export const SkeletonGenerator = () => {
  const location = useLocation();

  switch (location.pathname) {
    default:
      return <Loader />;
  }
};
