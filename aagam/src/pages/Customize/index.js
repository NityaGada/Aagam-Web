import Main from "../../components/Main";
import SubtypesMenu from "../../components/SubtypesMenu";

export default function Customize() {
    return <>
        <div style={{ width: '100%', display: 'flex', marginTop: 1+'em' }}>
            <div style={{ flex: 4 }}>
                <Main />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 1 + 'em' }}>
                <SubtypesMenu />
            </div>
        </div>
        <div>
            <Main />
        </div>
    </>
}