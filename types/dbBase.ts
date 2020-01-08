import dbBaseServer from './dbBaseServer'
import dbBaseClient from './dbBaseClient'
export default abstract class dbBase {
    abstract dbMap: Map<string,any>;
    abstract getDB(dbName:string):any;
    abstract put(dbName:string,key: string, value:any):Promise<boolean>;
    abstract get(dbName:string,key: string):Promise<any>;
    abstract del(dbName:string,key: string):Promise<boolean>;
    abstract getServer():dbBaseServer;
    abstract getClient():dbBaseClient;
}