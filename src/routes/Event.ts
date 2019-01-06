import {Context, GET, Path, PathParam, POST, QueryParam, ServiceContext} from "typescript-rest";
import {IEventModel} from "../models/eventModel/EventSchema";
import EventController from "../controllers/EventController";
import {ResponseBuider, Response} from "../shared/response";
import {UserController} from "../controllers/UserController";
import {IUserModel} from "../models/userModel/UserSchema";

@Path("/event")
export default class Event {
    @Context
    private context: ServiceContext;
    private eventCtrl: EventController = new EventController();
    private userCtrl: UserController = new UserController();

    // @Path("/:id")
    // @GET
    // public async get(@PathParam("id") id : string): Promise<Response> {
    //     let event: IEventModel = await this.eventCtrl.get(id);
    //     return ResponseBuider.BuildResponse(event);
    // }

    @Path("/save")
    @POST
    public async save(event: IEventModel): Promise<Response> {
        let userId: string = this.context.request.user.id;
        event.userId = userId;
        let savedResult: IEventModel = await this.eventCtrl.save(event);
        return ResponseBuider.BuildResponse(event);
    }

    @Path("/update")
    @POST
    public async update(event: IEventModel): Promise<Response> {
        let updatedResult: IEventModel = await this.eventCtrl.update(event, event._id);
        return ResponseBuider.BuildResponse(updatedResult);
    }

    @Path("/getMany")
    @GET
    public async getMany(@QueryParam("limit") limit: string, @QueryParam("offset") offset: string, @QueryParam("userId") userId: string): Promise<Response> {
        let conditions: any = userId ? {userId: userId} : {};
        let eventParams: any = {conditions, limit, offset};
        let events: IEventModel[] = await this.eventCtrl.getMany(eventParams);
        let authorsIds: string[] = events.map(event =>  event.userId);
        let authors: IUserModel[] = await this.userCtrl.getMany(authorsIds);
        events.forEach((event: IEventModel) => {
            let author: IUserModel = authors.find(author => author._id == event.userId);
            event.creatorAvatar = author.avatar;
            event.creatorName = `${author.lastName} ${author.firstName}`;
        });
        return ResponseBuider.BuildResponse(events);
    }
}