import { Profile } from "../profile/profile.interface";

export interface ChatMessage {
    userId: string;
    userAvatar?: string;
    toUserId: string;
    time: Date;
    message: string;
    userToProfile: Profile;
    userFromProfile;
    $key?: string;
  }