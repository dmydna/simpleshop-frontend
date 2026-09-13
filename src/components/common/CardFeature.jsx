import React from "react";
import { Col, Card } from "react-bootstrap";


function CardFeature({title, image, text, id }){

  return(
       <Col id={id} key={title} xs={12} sm={6} md={4} lg={3}>
         <Card
           className="h-100 text-center border-0 rounded-4 hover-shadow transition"
           style={{ cursor: "pointer" }}
         >
         <div className="p-4">
           <Card.Title 
             className="small fw-semibold text-secondary text-truncate mb-2"
           >
             {title}
           </Card.Title>
 
           <div 
            className="d-flex justify-content-center align-items-center" 
            style={{ height: "180px" }}>
             <Card.Img
               src={image}
               alt={title}
               style={{objectFit: "contain",maxHeight: "100%",width: "auto", filter: "hue-rotate(327deg)"}}
             />
           </div>
             <Card.Text 
              className="text-muted small mt-3"
             >
              {text}
             </Card.Text>
         </div>
        </Card>
      </Col>
  )
}

export default CardFeature
