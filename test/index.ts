import {equal, deepEqual} from 'assert';
import level from '../index'
const server = level.getServer();
const client = level.getClient();
const testUnit = {
    [Symbol('test.getServer')] : async function() {
       const res = await server.listen();
       equal(res, true,'getServer error!')
    },
    [Symbol('test.getClient')] : async function() {
        const res = await client.conect('test')
        equal(res, true,'getClient error!')
    },
    [Symbol('test.ping')] : async function() {
        const res = await client.ping()
        equal(res, true,'getClient error!')
    },
    [Symbol('test.put')] : async function() {
        equal(
            await client.put('test','test') &&
            await client.put('test:0','0') &&
            await client.put('test:9','9')
        , true,'put error!')
    },
    [Symbol('test.get')] : async function() {
        const res = await client.get('test')
        equal(res, 'test','get error!')
    },
    [Symbol('test.del')] : async function() {
        equal(
            await client.del('test') &&
            await client.del('test:0') &&
            await client.del('test:9')
            , true,'del error!')
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