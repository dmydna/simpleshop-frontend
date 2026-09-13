import React from "react";
import { Col } from "react-bootstrap";
import LinkArrow from "@common/LinkArrow";


function CardPromo({Img, children, variant , to, cta, className, p, m}){

    return(
      <Col sm={12} md={12} lg
      className={`d-flex flex-column flex-md-row align-items-stretch border rounded overflow-hidden shadow-sm ${className}`}
      
      >
       <Col 
        className={`bg-light d-flex align-items-center justify-content-center px-4 py-5`} md={6}>
         <img src={Img}
           className="img-fluid rounded"
           style={{ maxHeight: "220px", objectFit: "contain" }}
         />
       </Col>
   
       <Col className={`bg-${variant} text-white d-flex flex-column justify-content-center flex-fill px-4 py-5`} md={6}>
         <div>
            {children}
         </div>
   
         <div className="d-inline-flex align-items-center mt-3 fw-semibold">
           <LinkArrow style={
            {background: "#0000003b",borderRadius: "10px",padding: "0px 10px"}} to={to}>
             {cta}
           </LinkArrow>
         </div>
       </Col>
     </Col>
    )
}


export default CardPromo