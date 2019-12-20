import level from 'level';
import dbBaseServer from '../../dbBaseServer'
import RpcServer from './RpcServer'
import {
    loadPackageDefinition as grpcLoadPackageDefinition,
    Server as grpcServer,
    ServerCredentials as grpcServerCredentials,
} from 'grpc'
import {loadSync as protoLoaderLoadSync} from '@grpc/proto-loader'
import {dirname as pathDirname, join as pathJoin} from 'path';

export class LevelDB extends dbBaseServer {
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
    async pong():Promise<boolean>  {
        return true;
    }
    listen(ip:string,port: number):void {
        var levelProto = pathJoin(__dirname,'level.proto');;
        
        var packageDefinition = protoLoaderLoadSync(
            levelProto,
            {keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
            });
        const level_proto = grpcLoadPackageDefinition(packageDefinition).level;
        const server = new grpcServer();
        server.addService(level_proto.Level.service, RpcServer.getServer(this) );
        server.bind('0.0.0.0:50051', grpcServerCredentials.createInsecure());
        server.start();
    }
}

export default LevelDB;
