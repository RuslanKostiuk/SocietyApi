import {IPhoto} from "../photoModel/IPhoto";

export interface IEvent {
    title: string;
    description: string;
    photos: IPhoto[];
    theme: string;
    likes: Array<string>;
    holdingDate: string;
    comments: Array<{
        idUser: string,
        text: string
    }>,
    location: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    creatorAvatar: string;
    creatorName: string;
}