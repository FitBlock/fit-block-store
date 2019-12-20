export default abstract class dbBaseClient {
    abstract ping():Promise<boolean>;
    abstract conect(ip:string,port: number):Promise<boolean>;
}