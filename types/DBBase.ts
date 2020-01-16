import dbBaseServer from './DBBaseServer'
import dbBaseClient from './DBBaseClient'
export default abstract class DBBase {
    abstract dbMap: Map<string,any>;
    abstract getDB(dbName:string):any;
    abstract put(dbName:string,key: string, value:any):Promise<boolean>;
    abstract get(dbName:string,key: string):Promise<any>;
    abstract del(dbName:string,key: string):Promise<boolean>;
    abstract getServer():dbBaseServer;
    abstract getClient():dbBaseClient;
}