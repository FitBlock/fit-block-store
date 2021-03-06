import dbBaseClient from '../../types/DBBaseClient'
import config from './config'
import {join as pathJoin} from 'path';
import {
    loadPackageDefinition as grpcLoadPackageDefinition,
    credentials
} from 'grpc'
import {loadSync as protoLoaderLoadSync} from '@grpc/proto-loader'
export default class levelClient extends dbBaseClient {
    client: any;
    async setDB(dbName:string):Promise<void> {
        this.dbName = dbName;
    }
    ping():Promise<boolean> {
        return new Promise((resolve,reject)=>{
            this.client.ping({ok: true}, (err, response)=> {
                if(err){return reject(err)}
                return resolve(response.ok);
            });
        })
    }
    put(key: string, value:string):Promise<boolean> {
        return new Promise((resolve,reject)=>{
            this.client.put({key:{dbName:this.dbName,key},value:{value}}, (err, response)=> {
                if(err){return reject(err)}
                return resolve(response.ok);
            });
        })
    }
    get(key: string):Promise<string>  {
        return new Promise((resolve,reject)=>{
            this.client.get({dbName:this.dbName,key}, (err, response)=> {
                if(err){return reject(err)}
                return resolve(response.value);
            });
        })
    }

    del(key: string):Promise<boolean>  {
        return new Promise((resolve,reject)=>{
            this.client.del({dbName:this.dbName,key}, (err, response)=> {
                if(err){return reject(err)}
                return resolve(response.ok);
            });
        })
    }

    query(options: any):Promise<Array<any>> {
        return new Promise((resolve,reject)=>{
            this.client.query({
                dbName:this.dbName,
                reverse:false,
                limit:-1,
                ...options}, (err, response)=> {
                if(err){return reject(err)}
                return resolve(response.list);
            });
        })
    }
    async isConect(): Promise<boolean> {
        return Boolean(this.client)
    }
    async conect(dbName:string='default'): Promise<boolean> {
        const levelProto = pathJoin(config.appSrcPath,'level.proto');;
        const packageDefinition = protoLoaderLoadSync(
            levelProto,
            {keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
            });
        const level_proto = grpcLoadPackageDefinition(packageDefinition).level;
        this.client = new level_proto['Level'](
            `${config.ip}:${config.port}`,
            credentials.createInsecure()
        );
        await this.setDB(dbName);
        return true;
    }
    close():Promise<boolean> {
        return new Promise((reslove,reject)=>{
            return reslove(true);
        })
    }
}