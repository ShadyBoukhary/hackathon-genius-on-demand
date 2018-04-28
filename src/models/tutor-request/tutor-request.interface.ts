export interface TutorResquest {
    $from: string;
    time: Date;
    place: string;
    timePreferred: Date;
    major: string;
    subject: string;
    class: string;
    images?: string[];
    $key?: string;
}