import {sep as pathSep} from 'path';
export default {
    ip:'127.0.0.1',
    port:5657,
    appSrcPath:__dirname.replace(`fit-block-store${pathSep}build`,`fit-block-store`)
}