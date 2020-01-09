import dbBaseServer from '../../types/dbBaseServer'
import config from './config'
import {join as pathJoin} from 'path';
import {
    loadPackageDefinition as grpcLoadPackageDefinition,
    Server as grpcServer,
    ServerCredentials as grpcServerCredentials,
} from 'grpc'
import {loadSync as protoLoaderLoadSync} from '@grpc/proto-loader'
import LevelDB from './index'
export default class levelServer extends dbBaseServer {
    levelDB: LevelDB;
    server: grpcServer;
    constructor(levelDB:LevelDB) {
        super();
        this.levelDB = levelDB;
    }
    async listen():Promise<boolean> {
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
        this.server = new grpcServer();
        this.server.addService(level_proto['Level'].service, {
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
            query: async (call, callback) => {
                try {
                    const value = await this.levelDB.query(call.request.dbName,call.request)
                    callback(null, {list: value});
                } catch(err) {
                    callback(err);
                }
            },
        });
        this.server.bind(`${config.ip}:${config.port}`, grpcServerCredentials.createInsecure());
        this.server.start();
        return true;
    }
    close():Promise<boolean> {
        return new Promise((reslove,reject)=>{
            this.server.tryShutdown(()=>{
                reslove(true)
            })
        })
        
    }
}