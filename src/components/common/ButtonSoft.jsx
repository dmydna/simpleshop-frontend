import { Button } from "react-bootstrap";

export default function ButtonSoft({
	children, 
	onClick=()=>{}, 
	variant="primary",
	disabled=false, 
	style={}}
){

	return(
      <Button
        disabled={disabled}
        style={style}
        className={`p-2 w-100 
          bg-${variant} bg-opacity-10   
          text-${variant} text-truncate fw-medium 
          shadow-none border-0 rounded 
          overflow-hidden`}
        onClick={onClick}
      > 
        {children}
      </Button>
	)
}