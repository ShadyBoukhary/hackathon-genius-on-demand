export interface Answer {
    $from: string;
    text: string;
    images?: string[];
    time: Date;
    $question: string;
    $key?: string;

}