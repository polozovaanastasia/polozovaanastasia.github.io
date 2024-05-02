import { getDataSettings, start } from "../../data.js";
import { Button } from "../Button/button.component.js";
import { Settings } from "./settings.component.js";

export const SetSettings = () => {
    const setSettingsElement = document.createElement("div");

    setSettingsElement.classList.add("set-settings");

    setSettingsElement.append(
        Settings(getDataSettings()),
        Button("Start", "click", start)
    );

    return setSettingsElement;
};
