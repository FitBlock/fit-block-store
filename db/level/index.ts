import levelup from 'levelup';
import leveldown from 'leveldown';
import dbBase from '../../types/dbBase'
import levelClient from './client'
import levelServer from './server'
import config from './config'
import {join as pathJoin} from 'path';

export default class LevelDB extends dbBase {
    dbMap: Map<string,levelup>;
    constructor() {
        super();
        this.dbMap = new Map();
    }
    getDB(dbName:string):levelup {
        if(this.dbMap.has(dbName)) {
            return this.dbMap.get(dbName);
        }
        const dbPath = pathJoin(config.appSrcPath,'data',`${dbName}`);
        const db = levelup(leveldown(dbPath));
        this.dbMap.set(dbName, db);
        return db;
    }
    put(dbName:string,key: string, value:string):Promise<boolean> {
        return new Promise((reslove,reject)=>{
            this.getDB(dbName).put(key, value,(err)=>{
                if(err){return reject(err);}
                return reslove(true);
            });
        })
    }

    get(dbName:string,key: string):Promise<string>  {
        return new Promise((reslove,reject)=>{
            this.getDB(dbName).get(key,(err, value)=>{
                if(err){return reject(err);}
                return reslove(value);
            });
        })
    }

    del(dbName:string,key: string):Promise<boolean>  {
        return new Promise((reslove,reject)=>{
            this.getDB(dbName).del(key,(err)=>{
                if(err){return reject(err);}
                return reslove(true);
            });
        })
    }

    query(dbName:string,options: any):Promise<Array<any>>  {
        return new Promise((reslove,reject)=>{
            const dataList = []
            this.getDB(dbName).createReadStream(options)
            .on('data',  (data) => {
                dataList.push(data);
              })
              .on('error',  (err) => {
                reject(err)
              })
              .on('close',  () => {
                reslove(dataList)
              })
        })
    }

    getServer():levelServer {
        return new levelServer(this);
    }
    getClient():levelClient {
        return new levelClient();
    }
    
}
