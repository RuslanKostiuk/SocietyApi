import {FriendIviteStatuses, RelationshipStatuses} from "../../shared/enums";

export interface IUser {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    birthday: Date,
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
    friends:[{
        idFriend: string,
        friendInviteStatus: FriendIviteStatuses
    }],
    conversatinsIds: Array<string>,
    videos: string,
    gender: string,
    wall: any,
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}