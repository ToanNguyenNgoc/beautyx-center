/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { IMGS } from "../../_metronic/assets/imgs/imgs";

export function onErrorImg(e: any) {
    e.target.src = IMGS.beautyxIcon;
    e.target.style.objectFit = "contain";
    //e.target.style.transform = "scale(0.5)";
}
export default onErrorImg