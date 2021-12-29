import SceneData from '../gameTypes/SceneData';

export default class Levels {
    gameLevels: SceneData[];

    

    constructor() {
        let levels = {
            0: [[1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ],  
            1: [[1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ],
            2: [[1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ],
            3: [[1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ],
            4: [[0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0]
            ],
            5: [[1, 0, 0, 1, 1, 0, 0, 1],
                [0, 0, 0, 1, 1, 0, 0, 0],
                [1, 0, 0, 1, 1, 0, 0, 1]
            ],
            6: [[1, 0, 0, 1, 1, 0, 0, 1],
                [0, 0, 0, 1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0, 0, 1, 1]
            ],
            7: [[0, 1, 0, 1, 1, 0, 1, 1],
                [1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 0, 1, 0, 1, 1, 1]
            ]
        }

        this.gameLevels = [
            new SceneData(levels[0]),
            new SceneData(levels[1]),
            new SceneData(levels[2]),
            new SceneData(levels[3]),
            new SceneData(levels[4]),
            new SceneData(levels[5]),
            new SceneData(levels[6]),
            new SceneData(levels[7]),
        ]
    }
}