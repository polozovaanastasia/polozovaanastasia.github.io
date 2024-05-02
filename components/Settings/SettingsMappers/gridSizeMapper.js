import { setGridSize } from "../../../data.js";

export const gridSizeMapper = (gridSize) => {
    const options = Array.isArray(gridSize) ? gridSize : [gridSize];
    return {
        name: "Grid size",
        options: options.map((option) => ({
            innerText: `${option.x} x ${option.y}`,
            value: option,
        })),
        onChangeHandler: setGridSize,
    };
};
