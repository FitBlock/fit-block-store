# fit-block-store
FitBlock‘s store component

# exmaple
```js
// const level = require('./index.js').default;
import level from './index';
const server = level.getServer();
const client = level.getClient();
async function run () {
    await server.listen('127.0.0.1',5657);
    await client.conect('127.0.0.1',5657,'test');
    await client.ping();
    await client.put('test','test');
    console.log(await client.get('test'));
    await client.del('test');
    await server.close()
}

```
# api
## client
#### FunctionName  conect
* Return  Promise\<boolean\>
* Description  conect to server
* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  host   |string|must  |'127.0.0.1'   | host
  port |number|must  |5657         | port
  dbName |string|must  |'test'         | dbName

#### FunctionName  put
* Return  Promise\<boolean\>
* Description  insert or update data
* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  key   |string|must  |'testKey'   | key
  value |string|must  |'testValue'         | value

#### FunctionName  get
* Return  Promise\<string\>
* Description  get data by key
* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  key   |string|must  |'testKey'   | key

#### FunctionName  del
* Return  Promise\<boolean\>
* Description  del data by key
* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  key   |string|must  |'testKey'   | key

## server
#### FunctionName  listen
* Return  Promise\<boolean\>
* Description  run server
* Param

  name        | type |require |default    |Description
  ------------|------|--------|-----------|------------
  host   |string|must  |'127.0.0.1'   | host
  port |number|must  |5657         | port

