import dbFactory from './dbFactory';
export default dbFactory.getDBInstance('level');
export const getDBInstance = dbFactory.getDBInstance;