import { BOARD_CLICK } from "./constants"

export const boardClick= (x_coord, y_coord, player_id, hitShip) => {
    return {
        type: BOARD_CLICK,
        payload: {
            x_coord: x_coord,
            y_coord: y_coord,
            player_id: player_id,
            hitShip: hitShip
        }
    }
}