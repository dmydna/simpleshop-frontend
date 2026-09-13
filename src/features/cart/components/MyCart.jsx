import { Tintify } from "@/components/common/FloatButtonCollection";
import CartClearModal from "@f/cart/components/CartClearModal.jsx";
import MyCartTable from "@f/cart/components/MyCartTable.jsx";
import { useState } from "react";
import { Card } from "react-bootstrap";


export const MyCart = ({ children, className, clearCart, cartItems }) => {

    const [showClearCart, setShowClearCart] = useState(false)

    return (
        <>

            <Card className={`my-2 mt-0 mx-0 mx-lg-1 ${className}`}>
                <div className="d-flex align-items-center justify-content-between">
                    {children}
                    <Tintify style={{padding: "4px"}} className="rounded-circle">
                    <i onClick={() => setShowClearCart(true)}
                        style={{ fontSize: "xx-large" }} className="bi bi-x hover-icon"></i>
                    </Tintify>
                </div>

                <CartClearModal
                    show={showClearCart}
                    onHide={setShowClearCart}
                    handle={clearCart}
                />
                <hr />
                <MyCartTable content={cartItems} />
            </Card>
        </>)

}