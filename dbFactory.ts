import Level from './db/level'
import dbBaseServer from './dbBaseServer'
const instanceMap: Map<String, any> = new Map(); 
export default class dbFactory {
    static getInstance(name:string):dbBaseServer {
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