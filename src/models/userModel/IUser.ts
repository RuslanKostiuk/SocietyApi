import {FriendIviteStatuses, RelationshipStatuses} from "../../shared/enums";
import {IAlbum} from "../albumModel/IAlbum";

export interface IUser {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    birthday: string,
    relationship: {
        idParthner: string,
        relationshipStatus: RelationshipStatuses
    },
    isOnline: boolean,
    isFirstTime: boolean,
    address: {
        city: string,
        street: string,
        houseNumber: string
    },
    friends: [{
        idFriend: string,
        friendInviteStatus: FriendIviteStatuses
    }],
    gender: string,
    albums: IAlbum[],
    wall: any[],
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    verificationCode: string;
    avatar: string;
}