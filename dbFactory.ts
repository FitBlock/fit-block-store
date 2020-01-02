import Level from './db/level'
import dbBase from './types/dbBase'
const instanceMap: Map<String, any> = new Map(); 
export default class dbFactory {
    static getDBInstance(name:string):dbBase {
        if(instanceMap.has(name)) {
            return instanceMap.get(name);
        }
        switch(name.toLowerCase()) {
            case 'level':
                instanceMap.set(name, new Level());
                break;
            default:
                throw new Error('not support db.')
        }
        return instanceMap.get(name);
    }
}