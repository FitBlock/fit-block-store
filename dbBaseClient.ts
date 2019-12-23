export default abstract class dbBaseClient {
    abstract conect(ip:string,port: number):Promise<boolean>;
}