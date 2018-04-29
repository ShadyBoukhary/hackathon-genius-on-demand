import { Profile } from "../profile/profile.interface";
import { Question } from "../question/question.interface";

export interface Answer {
    from: string;
    text: string;
    images?: string[];
    time: Date;
    $key?: string;
    fromProfile: Profile;

}