import React from "react";
import { Button } from "react-bootstrap";

function BuyNowButton({handle, variant, children, className}){


    return(
        <Button
            className={`rounded flex-fill ${className}`}
            variant={variant}
            type="submit"
            onClick={()=> handle()}
        >
            <i className="bi bi-cart3 me-3"></i>
            {children ? children : 'Buy Now'}
        </Button>
    )
}

export default BuyNowButton
