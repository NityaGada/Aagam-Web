import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            Home
            <button>
                <Link to="/customize/Nawabi">View Nawabi</Link>
            </button>
        </>
    );
}
