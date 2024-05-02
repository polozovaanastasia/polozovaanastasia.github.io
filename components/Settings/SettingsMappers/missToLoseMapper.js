import { setMissToLose } from "../../../data.js";

export const missToLoseMapper = (missToLose) => {
    const options = Array.isArray(missToLose) ? missToLose : [missToLose];

    return {
        name: "Miss to lose",
        options: options.map((option) => ({
            innerText: option,
            value: option,
        })),
        onChangeHandler: setMissToLose,
    };
};
