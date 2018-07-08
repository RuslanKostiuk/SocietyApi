export interface IPhoto {
    path: string,
    creationDate: Date,
    idAlbum: string,
    idsComments: Array<string>,
    likes: Array<string>,
    isCurrent: boolean
    idUser: string
}