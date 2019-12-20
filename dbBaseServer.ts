export default abstract class dbBaseServer {
    abstract pong():Promise<boolean>;
    abstract listen(ip:string,port: number):void;
}