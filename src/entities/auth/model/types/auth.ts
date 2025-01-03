import { Profile } from "@/entities/profile";

export interface LoginFormValues {
  username: string;
  password: string;
}

type User = Profile;

interface AuthResponse {
  access_token: string;
  user: User;
}

export type LoginBodyRequest = LoginFormValues;
export type LoginResponse = AuthResponse;