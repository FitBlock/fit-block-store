import dbBaseClient from '../../dbBaseClient'
import {dirname as pathDirname, join as pathJoin} from 'path';
import {
    loadPackageDefinition as grpcLoadPackageDefinition,
    credentials
} from 'grpc'
import {loadSync as protoLoaderLoadSync} from '@grpc/proto-loader'
export default class levelClient extends dbBaseClient {
    conect(ip: string, port: number): Promise<boolean> {
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
        const client = new level_proto['Level'](
            `${ip}:${port}`,
            credentials.createInsecure()
        );
        return new Promise((resolve,reject)=>{
            client.ping({ok: true}, (err, response)=> {
                if(err){return reject(err)}
                console.log('pong:', response);
                return resolve(response.ok);
            });
        })
    }
}