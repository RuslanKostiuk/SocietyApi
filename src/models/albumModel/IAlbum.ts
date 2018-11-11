import {IPhoto} from "../photoModel/IPhoto";

export interface IAlbum {
    name: string;
    photos: IPhoto[];
    createdAt: Date;
    updatedAt: Date;
}