import level from 'level';
import dbBaseServer from '../dbBaseServer'
import {dirname as pathDirname, join as pathJoin} from 'path';
export enum witreOperate {
    Del = "del",
    Put = "put",
}
export class BatchOperate {
    type: witreOperate;
    key: string;
    value:any;
}
export class QueryOptions {
    gt:string;
    gte:string;
    lt:string;
    lte:string;
    reverse:boolean = false;
    limit:number = -1;
    keys:boolean = true;
    values:boolean = true;
}
export abstract class Leveliterator {
    abstract db:level;
    abstract next(callback:Function):void;
    abstract seek(targetKey:string):void;
    abstract end(callback:Function):void;
}

export class LevelDB extends dbBaseServer {
    dbMap: Map<string,level>;
    getDB(dbName:string):level {
        throw new Error("Method not implemented.");
    }
    async put(dbName:string,key: string, value:any):Promise<boolean> {
        return await this.getDB(dbName).put(key, value);
    }

    async get(dbName:string,key: string):Promise<any>  {
        return await this.getDB(dbName).get(key);
    }

    async del(dbName:string,key: string):Promise<boolean>  {
        return await this.getDB(dbName).del(key);
    }

    query(dbName:string,queryOptions:QueryOptions):AsyncIterable<any> {
        return this.getDB(dbName).createReadStream(queryOptions);
    }
    async batch(dbName:string,batchOperate:Array<BatchOperate>):Promise<boolean>  {
        return await this.getDB(dbName).batch(batchOperate);
    }

    async listen(ip:string,port: number):Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export default LevelDB;
