export {
  getUserAuthData,
  getUserInited,
} from "./model/selectors/userSelectors";
export { userActions, userReducer } from "./model/slice/userSlice";
export { initAuthData } from "./model/services/initAuthData";

export type { User, UserSchema } from "./model/types/user";