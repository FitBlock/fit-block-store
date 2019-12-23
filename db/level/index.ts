import level from 'level';
import dbBase from '../../dbBase'
import levelClient from './client'
import levelServer from './server'
import {dirname as pathDirname, join as pathJoin} from 'path';

export default class LevelDB extends dbBase {
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

    getServer():levelServer {
        return new levelServer(this);
    }
    getClient():levelClient {
        return new levelClient();
    }
    
}
