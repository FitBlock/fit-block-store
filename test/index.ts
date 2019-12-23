import {ok,equal,deepStrictEqual, strictEqual} from 'assert';
import level from '../index'
let testUnit = {
    [Symbol('test.getServer')] : async function() {
        const server = level.getServer();
        await server.listen('127.0.0.1',5657);
        const client = level.getClient();
        await client.conect('127.0.0.1',5657)
        
    },
}

async function run(testUnitList) {
    for(let testUnitValue of testUnitList) {
        for(let testFunc of Object.getOwnPropertySymbols(testUnitValue)) {
            await testUnitValue[testFunc]();
        }
    }
}
run([testUnit]);