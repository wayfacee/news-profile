import { ProfileSettings } from "@/features/profile/profile-settings";
import cls from "./ProfilePage.module.scss";

const ProfilePage = () => {
  return <ProfileSettings className={cls.container} />;
};

export default ProfilePage;