import { LS_ACCESS_TOKEN_KEY } from "@/shared/const";
import { getFromLS } from "@/shared/helpers/manageLocalStorage";
import { useLazyProfileQuery } from "../../api/profileApi";
import { useEffect } from "react";

export const useInitProfile = () => {
  const token = getFromLS(LS_ACCESS_TOKEN_KEY);
  const [getProfile, { data: profile, isLoading, isError }] =
    useLazyProfileQuery();

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token, getProfile]);

  return { profile, isLoading, isError };
};
