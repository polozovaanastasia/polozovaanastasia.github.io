import { catchGoogle } from "../../../../data.js";

export const Google = () => {
    // create elements:
    const containerElement = document.createElement("div");
    const googleElement = document.createElement("img");

    containerElement.classList.add("target");
    googleElement.src = "../../assets/images/google.png";

    // appends elements:
    containerElement.append(googleElement);
    containerElement.addEventListener("click", catchGoogle);

    return containerElement;
};
