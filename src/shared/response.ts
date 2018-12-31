export type Response = {
    status: number,
    body: any
}

export class ResponseBuider {
    public static BuildResponse(body?: any, status: number = 200): Response {
        if (body && body[0]) console.log(body);
        return{
            body: body,
            status: status
        }
    }
}