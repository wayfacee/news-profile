export interface Profile {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  companyName: string;
}

export interface ProfileState {
  fullProfile: Profile | null;
}

export type ProfileResponse = Profile;