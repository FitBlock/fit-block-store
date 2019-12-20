import level from 'level';
import dbBase from '../../dbBase'
import {dirname as pathDirname, join as pathJoin} from 'path';

export class LevelDB extends dbBase {
    dbMap: Map<string,level>;
    getDB(dbName:string):level {
        if(this.dbMap.has(dbName)) {
            return this.dbMap.get(dbName);
        }
        const dbPath = pathJoin(pathDirname(pathDirname(__dirname)),'data',dbName);
        const db = level(dbPath);
        this.dbMap.set(dbName, db);
        return db;
    }
    async put(dbName:string,key: string, value:string):Promise<boolean> {
        return await this.getDB(dbName).put(key, value);
    }

    async get(dbName:string,key: string):Promise<string>  {
        return await this.getDB(dbName).get(key);
    }

    async del(dbName:string,key: string):Promise<boolean>  {
        return await this.getDB(dbName).del(key);
    }

    getServer():dbBaseServer {
        throw new Error("Method not implemented.");

    }
    getClient():dbBaseClient {
        throw new Error("Method not implemented.");

    }
    
}

export default LevelDB;
