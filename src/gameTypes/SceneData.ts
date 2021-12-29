import BrickConfig from './BrickConfig';

export default class SceneData {
    brickConfig: BrickConfig;
    level: number;

    constructor(rows?: number[][]) {
        this.brickConfig = new BrickConfig();
        this.level = 0;
        if(typeof rows !== 'undefined'){
            this.brickConfig.rows = rows;
        }
    }
}