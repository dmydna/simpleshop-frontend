import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap";

export default function AddNewButton({to}) {
    const navigate = useNavigate()
    return (
        <Button
            variant="light"
            onClick={() => navigate(`${to}`)}
            className="my-2 flex-fill flex-md-grow-0">
            <i className="bi bi-plus-lg"></i>
            <span className="fw-medium ms-2">Create new</span>
        </Button>
    )
}