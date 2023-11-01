// import "./index.css";

import { MenuItems } from "../MenuItems";

import { Link, useParams } from 'react-router-dom';

export default function SubtypesMenu() {
    const { title } = useParams();

    const selectedItem = MenuItems.find((item) => item.title === title);

    if (!selectedItem) {
        return <div>Title not found</div>;
    }

    const subtypes = Object.keys(selectedItem)
        .filter((key) => key.startsWith('subtype'))
        .map((key) => selectedItem[key]);

    return (
        <>
            {subtypes.map((subtype, index) => (
                <button key={index} style={{ width: '100%', cursor: 'pointer', background: '#007bff', borderRadius: 10 + 'px', fontSize: 1.5 + 'em', rowGap: 1 + 'em' }}>
                    <Link to={`/customize/${title}/${subtype}`} style={{ color: 'white', textDecoration: 'none' }}>{subtype}</Link>
                </button>
            ))}
        </>
    );
}
