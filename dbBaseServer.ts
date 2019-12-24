export default abstract class dbBaseServer {
    abstract listen(ip:string,port: number):Promise<boolean>;
    abstract close():Promise<boolean>;
}