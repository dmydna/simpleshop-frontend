import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { useState } from "react";
import CartInput2 from "@f/cart/components/CartInput2"

function AddToCartButton2({product, className = '',variant='success', children}){

    const { cartItems, addToCart } = useCart()

    const [showInput, setShowInput] = useState(false) 


    const handleAddToCart = () => {
      if (toast.isActive()) {
        return;
      }
      toast.success("Producto agregado al cart!", { theme: 'colored' });
    };

    return (
      <>
         { !showInput &&
          <Button
              onClick={() => setShowInput(true)} 
              className={`flex-fill rounded text-truncate ${className}`}
              variant={variant}
              type="submit"
              style={{cursor: "pointer"}}
          >
              <i className="bi bi-plus-lg me-2"></i>
              {children ? children : <span className="me-3">Add to Cart</span>}
              {cartItems.map((item) => item?.id === product?.id && 
                  <div key={item.id} 
                       style={{opacity: item?.cantidad == 0 ? '0': '1' }} 
                       className={`position-absolute d-inline-block`}
                  >
                     <span className={`rounded-circle badge bg-white text-success px-${item?.cantidad < 10 ? 2 : 1}`} >
                          {item?.cantidad}
                     </span>
                  </div> 
              )}
          </Button>
         }
         {showInput && <CartInput2 className="flex-fill" producto={product}/>}
      </>
    )
}

export default AddToCartButton2;
