import { Profile } from "../profile/profile.interface";

export interface TutorResquest {
    from: string;
    fromProfile: Profile;

    time: Date;
    place: string;
    datePreferred: Date;
    timePreferred: string;
    description: string;
    major: string;
    subject: string;
    class: string;
    images?: string[];
    $key?: string;
}