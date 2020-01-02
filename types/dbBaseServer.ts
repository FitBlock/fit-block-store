export default abstract class dbBaseServer {
    abstract listen():Promise<boolean>;
    abstract close():Promise<boolean>;
}