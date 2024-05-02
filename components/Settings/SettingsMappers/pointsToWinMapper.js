import { setPointsToWin } from "../../../data.js";

export const pointsToWinMapper = (pointsToWin) => {
    const options = Array.isArray(pointsToWin) ? pointsToWin : [pointsToWin];

    return {
        name: "Points to win",
        options: options.map((option) => ({
            innerText: option,
            value: option,
        })),
        onChangeHandler: setPointsToWin,
    };
};
