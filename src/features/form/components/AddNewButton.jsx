import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap";

export default function AddNewButton({to}) {
    const navigate = useNavigate()
    return (
        <Button
            onClick={() => navigate(`${to}`)}
            className="btn-sm rounded-2 border-0 bg-primary bg-opacity-10 text-primary my-2 flex-fill flex-md-grow-0">
            <i className="bi bi-plus-lg fs-5"></i>
            <span className="fw-medium p-2">Add new</span>
        </Button>
    )
}