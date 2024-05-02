import { Select } from "./Selects/select.component.js";
import { gridSizeMapper } from "./SettingsMappers/gridSizeMapper.js";
import { pointsToWinMapper } from "./SettingsMappers/pointsToWinMapper.js";
import { missToLoseMapper } from "./SettingsMappers/missToLoseMapper.js";
import { Toggle } from "./MusicToggle/toggle.component.js";
import { toggleAudio } from "../../data.js";

export const Settings = (data) => {
    const settingsElement = document.createElement("div");

    settingsElement.classList.add("set-settings__settings");

    settingsElement.append(
        Select(gridSizeMapper(data.gridSize)),
        Select(pointsToWinMapper(data.pointsToWin)),
        Select(missToLoseMapper(data.missToLose)),
        Toggle(data.isAudioOn, toggleAudio)
    );
    return settingsElement;
};
