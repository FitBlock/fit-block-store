export default abstract class DBBaseServer {
    abstract listen():Promise<boolean>;
    abstract close():Promise<boolean>;
}