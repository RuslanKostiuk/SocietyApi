export default interface IController {
    save(entity: any): Promise<any>;
    get(id: string): Promise<any>;
    update(entity: any, id: string): Promise<any>
    getMany(data?: any): Promise<any[]>;
}