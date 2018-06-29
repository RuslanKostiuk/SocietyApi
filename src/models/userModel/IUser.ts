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
    conversations: [{
        name: string,
        messages: [{
            id_sender: string,
            ids_listeners: Array<string>,
            text: string
        }]
    }],
    albums: [{
        name: string,
        creationDate: Date,
        lastUpdateDate: Date,
        photos: [{
            path: string,
            creationDate: Date,
            idAlbum: string,
            idsComments: Array<string>,
            likes: Array<string>,
            isCurrent: boolean
        }],
    }],
    videos: string,
    gender: string,
    wall: any,
    verified: boolean;
}