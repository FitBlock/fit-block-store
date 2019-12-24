import {equal} from 'assert';
import level from '../index'
const server = level.getServer();
const client = level.getClient();
let testUnit = {
    [Symbol('test.getServer')] : async function() {
       const res = await server.listen('127.0.0.1',5657);
       equal(res, true,'getServer error!')
    },
    [Symbol('test.getClient')] : async function() {
        const res = await client.conect('127.0.0.1',5657,'test')
        equal(res, true,'getClient error!')
    },
    [Symbol('test.ping')] : async function() {
        const res = await client.ping()
        equal(res, true,'getClient error!')
    },
    [Symbol('test.put')] : async function() {
        const res = await client.put('test','test')
        equal(res, true,'put error!')
    },
    [Symbol('test.get')] : async function() {
        const res = await client.get('test')
        equal(res, 'test','get error!')
    },
    [Symbol('test.del')] : async function() {
        const res = await client.del('test')
        equal(res, true,'del error!')
    },
    [Symbol('test.server.close')] : async function() {
        const res = await server.close()
        equal(res, true,'server close error!')
    },
}

async function run(testUnitList) {
    for(let testUnitValue of testUnitList) {
        for(let testFunc of Object.getOwnPropertySymbols(testUnitValue)) {
            try{
                await testUnitValue[testFunc]();
            } catch(err) {
                console.log(err.stack)
            }
            
        }
    }
}
run([testUnit]);