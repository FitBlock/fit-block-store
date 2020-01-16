import dbBase from './types/DBBase'
import Level from './db/level'
const instanceMap: Map<String, any> = new Map(); 
export default class dbFactory {
    static getDBInstance(name:string) {
        switch(name.toLowerCase()) {
            case 'level':
                return dbFactory.getDBByClass<Level>(Level);
            default:
                throw new Error('not support db.')
        }
    }
    static getDBByClass<T extends dbBase>(db: new () => T):T {
        if(instanceMap.has(db.name)) {
            return instanceMap.get(db.name);
        }
        const dbInstance = new db()
        instanceMap.set(db.name, dbInstance)
        return dbInstance;
    }
}