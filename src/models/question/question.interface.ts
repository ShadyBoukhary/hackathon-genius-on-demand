import { Answer } from "../answer/answer.interface";
import { Profile } from "../profile/profile.interface";

export interface Question {
    from: string;
    title: string;
    subtitle: string;
    fromProfile: Profile;
    description: string;
    time: Date;
    $key?: string;
    answers?: Answer[];
}