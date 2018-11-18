import {Context, Path, ServiceContext} from "typescript-rest";

@Path("events")
export default class Events {
    @Context
    private context: ServiceContext;


}