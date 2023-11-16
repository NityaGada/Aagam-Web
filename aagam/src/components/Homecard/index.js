import "./index.css";

import { Link } from "react-router-dom";

export default function Card(props) {
    return (
        <Link to={props.to} className="card">
            <div className="card-content">{props.content}</div>
        </Link>
    );
}
