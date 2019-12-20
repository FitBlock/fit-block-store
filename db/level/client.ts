import dbBaseClient from '../../dbBaseClient'
class levelClient extends dbBaseClient {
    ping(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }   
    conect(ip: string, port: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}