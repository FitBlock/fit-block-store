export default abstract class dbBaseServer {
    abstract listen(ip:string,port: number):Promise<boolean>;
}