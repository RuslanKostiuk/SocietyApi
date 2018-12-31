export type Response = {
    status: number,
    body: any
}

export class ResponseBuider {
    public static BuildResponse(body?: any, status: number = 200): Response {
        return{
            body: body,
            status: status
        }
    }
}