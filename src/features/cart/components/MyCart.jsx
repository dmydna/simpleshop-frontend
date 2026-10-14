import { Tintify } from "@/components/common/FloatButtonCollection";
import { useUrlState } from "@/hooks/useUrlState";
import CartClearModal from "@f/cart/components/CartClearModal.jsx";
import MyCartTable from "@f/cart/components/MyCartTable.jsx";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const MyCart = ({ children, className, clearCart, cartItems }) => {

    const { setSearchParams } = useUrlState()

    const handleClear = () => {
        setSearchParams(prev => ({...prev, dialog:"clear-cart"}))
    }

    return (
        <>

            <Card className={`${className}`}>
                <div className="d-flex align-items-center justify-content-between">

                    <p className="h5 fw-bold">
                      My cart({cartItems.length})
                    </p>

                    <Tintify style={{padding: "4px"}} className="rounded-circle">
                    <i onClick={ handleClear }
                        style={{ fontSize: "xx-large" }} className="bi bi-x hover-icon"></i>
                    </Tintify>
                </div>
                <hr />
                <MyCartTable content={cartItems} />
            </Card>
        </>)

}
