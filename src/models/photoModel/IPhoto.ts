export interface IPhoto {
    path: string,
    creationDate: Date,
    comments: Array<{
        idUser: string,
        text: string
    }>,
    likes: Array<string>,
    isCurrent: boolean
}