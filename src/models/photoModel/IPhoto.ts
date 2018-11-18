export interface IPhoto {
    path: string,
    creationDate: string,
    comments: Array<{
        idUser: string,
        text: string
    }>,
    likes: Array<string>,
    isCurrent: boolean
}