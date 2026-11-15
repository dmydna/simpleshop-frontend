import { Badge, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { useState } from "react";
import CartControl2 from "@/features/cart/components/CartControl2"
import ButtonSoft from "@/components/common/ButtonSoft";
import BadgeCount from "@common/BadgeCount"


function AddToCartButtonToggle({product, className = '',variant='success', children}){

    const { cartItems } = useCart()

    const [showInput, setShowInput] = useState(false) 


    return (
      <>
         { !showInput &&
          <ButtonSoft variant="success" onClick={() => setShowInput(true)} >
              <i className="bi bi-cart2 me-3 fs-5"></i>
              {children ? children : <span className="me-3">Add to Cart</span>}
              {cartItems.map((item) => item?.id === product?.id && 
                  <div key={item.id}  style={{opacity: item?.cantidad == 0 ? '0': '1' }} 
                       className={`small position-absolute d-inline-block mt-1`}
                  >

                    <BadgeCount
                      className={"mx-3"}
                      quantity={item?.cantidad}
                      variant="success"
                    />

                  </div> 
              )}
          </ButtonSoft>

         }
         {showInput && <CartControl2 variant={variant} className="flex-fill" producto={product}/>}
      </>
    )
}

export default AddToCartButtonToggle;
