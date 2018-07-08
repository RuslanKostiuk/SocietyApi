export interface IConversation {
    name: string,
    messages: [{
        id_sender: string,
        ids_listeners: Array<string>,
        text: string
    }]
}