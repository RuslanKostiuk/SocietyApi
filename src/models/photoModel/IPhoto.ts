export interface IPhoto {
    path: string;
    comments: Array<{
        idUser: string,
        text: string
    }>;
    likes: Array<string>;
    isCurrent: boolean;
    createdAt: Date;
    updatedAt: Date;
}