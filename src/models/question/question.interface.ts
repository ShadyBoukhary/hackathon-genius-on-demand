export interface Question {
    $from: string;
    title: string;
    subtitle: string;
    description: string;
    time: Date;
    $key?: string;
}