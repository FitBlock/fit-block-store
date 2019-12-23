import dbBaseServer from '../../dbBaseServer'
import {dirname as pathDirname, join as pathJoin} from 'path';
import {
    loadPackageDefinition as grpcLoadPackageDefinition,
    Server as grpcServer,
    ServerCredentials as grpcServerCredentials,
} from 'grpc'
import {loadSync as protoLoaderLoadSync} from '@grpc/proto-loader'
import LevelDB from './index'
export default class levelServer extends dbBaseServer {
    levelDB: LevelDB;
    constructor(levelDB:LevelDB) {
        super();
        this.levelDB = levelDB;
    }
    async listen(ip:string,port: number):Promise<boolean> {
        const levelProto = pathJoin(__dirname,'level.proto');;
        
        const packageDefinition = protoLoaderLoadSync(
            levelProto,
            {keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
            });
        const level_proto = grpcLoadPackageDefinition(packageDefinition).level;
        const server = new grpcServer();
        server.addService(level_proto['Level'].service, {
            ping: (call, callback) => {
                callback(null, {ok: call.request.ok});
            },
            get: async (call, callback) => {
                try {
                    const value = await this.levelDB.get(call.request.dbName,call.request.key)
                    callback(null, {value});
                } catch(err) {
                    callback(err);
                }
            },
            put: async (call, callback) => {
                try {
                    const value = await this.levelDB.put(
                        call.request.key.dbName,
                        call.request.key.key,
                        call.request.value.value,
                        )
                    callback(null, {ok: value});
                } catch(err) {
                    callback(err);
                }
            },
            del: async (call, callback) => {
                try {
                    const value = await this.levelDB.del(call.request.dbName,call.request.key)
                    callback(null, {ok: value});
                } catch(err) {
                    callback(err);
                }
            },
        });
        server.bind(`${ip}:${port}`, grpcServerCredentials.createInsecure());
        server.start();
        return true;
    }
}