import { Badge, Button } from "react-bootstrap";

export default function BadgeCount({className, variant="dark", quantity, limit=9}){

	return(
        <small className={className}>
            <Badge
                bg={variant}
                className={`${ quantity > 9 ? 'rounded-4': 'rounded-circle'} text-white pointer position-absolute`} 
                style={{ right: quantity > 9 ? -4 : 6, top: 5,  zIndex:100 }}
            >
               {quantity > limit ? `${limit}+`: quantity}
            </Badge>
        </small>

	)
}