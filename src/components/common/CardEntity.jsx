import { IconTint } from "@/components/common/IconTintyColor";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OffCanvasToggle from "./OffCanvasToggle";



export default function CardEntity({
    to, variant, ico, title, className ,description, children }) {

	const navigate = useNavigate()

    return (
        <Card  className={`border-0 p-0 text-start flex-row ${className}`}>

            <div className="d-block mx-auto position-relative">
 
            <div className="h-100 m-3 pointer" onClick={() => navigate(to)}>
            	<IconTint
            		variant={variant} 
            		icon={ico} 
                /> 	
            	</div>	
        	</div>

            <Card.Body className="rounded mt-2 ps-1 overflow-hidden me-3">
                <Card.Title  className='fs-6 mb-0'>
                    { title || "entity" }
                </Card.Title>
                <Card.Text className="mb-0 d-inline-block">
                <span style={{whiteSpace: 'nowrap', maxWidth:'100%'}} 
                    className="text-secondary mb-0 small d-inline-block text-truncate">
                    { description || '30 (active)' }
                    { children }
                </span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
