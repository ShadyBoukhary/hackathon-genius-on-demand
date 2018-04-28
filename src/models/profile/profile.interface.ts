export interface Profile {
    firstName: string;
    lastName: string;
    major: string;
    degreeType: string;
    numberOfQuestions: number;
    numberOfAnswers: number;
    numberOfTutorRequests: number;
    email: string;
    classification: string;
    dateOfBirth: Date,
    $key?: string;
}