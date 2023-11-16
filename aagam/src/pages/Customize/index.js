import { useLocation } from "react-router-dom";

import Main from "../../components/Main";
import Subtypes from "../../components/Subtypes";
import Theme from "../../components/Themes";

export default function Customize() {
    const { state } = useLocation();
    
    var image1 = state.image1;
    var image2 = state.image2;
    var ogimage = state.ogimage;
    var bodypart = state.handsface;

    return <>
        <div style={{ width: '100%', display: 'flex', marginTop: 1+'em' }}>
            <div style={{ flex: 4 }}>
                <Main img1 = {image1} img2 = {image2} ogimg = {ogimage} handsface = {bodypart}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1 + 'em' }}>
                <Subtypes />
            </div>
        </div>
        <div>
            <Theme img1 = {image1} img2 = {image2} ogimg = {ogimage} handsface = {bodypart}/>
        </div>
    </>
}