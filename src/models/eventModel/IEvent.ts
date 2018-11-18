import {IPhoto} from "../photoModel/IPhoto";

export interface IEvent {
    title: string;
    description: string;
    photos: IPhoto[];
    theme: string;
    likes: Array<string>;
    comments: Array<{
        idUser: string,
        text: string
    }>,
    creationDate: string;
}