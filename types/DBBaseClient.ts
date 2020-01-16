export default abstract class DBBaseClient {
    dbName: string;
    abstract setDB(dbName:string):Promise<void>;
    abstract ping():Promise<boolean>;
    abstract put(key: string, value:any):Promise<boolean>;
    abstract get(key: string):Promise<any>;
    abstract del(key: string):Promise<boolean>;
    abstract isConect(): Promise<boolean>;
    abstract conect(dbName:string):Promise<boolean>;
    abstract close():Promise<boolean>;
}