import { BOARD_CLICK } from "./constants"

export const boardClick= (x_coord, y_coord, enemy, hit, miss) => {
    return {
        type: BOARD_CLICK,
        payload: {
            x_coord: x_coord,
            y_coord: y_coord,
            enemy: enemy,
            hit: hit,
            miss: miss,
        }
    }
}