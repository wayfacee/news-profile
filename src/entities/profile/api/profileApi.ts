import { baseApi } from "@/shared/api";
import type { ProfileResponse } from "../model/types/profile";
import { profileApiUrls } from "../model/constants/profileConstants";
import { ApiTags } from "@/shared/api/apiTags";
import { profileActions } from "../model/slices/profileSlice";

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query<ProfileResponse, void>({
      query: () => profileApiUrls.profile,
      providesTags: [ApiTags.PROFILE],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(profileActions.setProfile(result.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLazyProfileQuery } = profileApi;