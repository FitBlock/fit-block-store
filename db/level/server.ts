import dbBaseServer from '../../dbBaseServer'
import {dirname as pathDirname, join as pathJoin} from 'path';
import {
    loadPackageDefinition as grpcLoadPackageDefinition,
    Server as grpcServer,
    ServerCredentials as grpcServerCredentials,
} from 'grpc'
import LevelDB from './index'
import {loadSync as protoLoaderLoadSync} from '@grpc/proto-loader'
class levelServer extends dbBaseServer {
    levelDB: LevelDB;
    constructor(levelDB:LevelDB) {
        super();
        this.levelDB = levelDB;
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