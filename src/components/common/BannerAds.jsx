import React from "react";
import { Col } from "react-bootstrap";

function BannerAds({image, children, className, imgWith, btnText}){

    return(
      <Col sm={12} md={12} lg
      className={`d-flex flex-column flex-md-row align-items-stretch rounded overflow-hidden`}
      >
        <div  className={`${className} p-5 border rounded d-flex justify-content-between flex-wrap flex-fill shadow-sm`}>
          <div className="flex-fill flex-md-grow-0">
            <img src={image} width={imgWith || 130} className="d-block mx-auto" />
          </div>
          <div className={`flex-fill pt-md-3 pt-0 ms-4`}>
            {children}
            <div className={`${btnText ? 'd-flex' : 'd-none'} align-items-center gap-2`}>
                <p className="border rounded px-3 py-1 small bg-white" 
             style={{transform: "translateY(28px)"}}>{btnText}</p> 
            </div>
          </div>
        </div>
      </Col>
    )
}

export default BannerAds