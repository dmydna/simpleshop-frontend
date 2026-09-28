import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCart } from "@f/cart/contexts/CartContext.jsx";



function AddToCartButton({product, className = '',variant='success', children}){

    const { cartItems, addToCart} = useCart()


    const handleAddToCart = () => {
      if (toast.isActive()) {
        return;
      }
      toast.success("Producto agregado al cart!");
    };

    return (
      <>
          <Button
              onClick={() => {
                  product && addToCart(product);
                  handleAddToCart();
              }}
              className={`flex-fill rounded text-truncate ${className}`}
              variant={variant}
              type="submit"
              style={{cursor: "pointer"}}
          >
              <i className="bi bi-plus-lg me-2"></i>
              {children ? children : 'Add to Cart'}
              {cartItems.map((item) => item?.id === product?.id && item?.cantidad !== 0 ?
                          <div key={item.id} className="position-relative d-inline-block ms-3">
                             <span className={`rounded-circle badge bg-white text-success px-${item?.cantidad < 10 ? 2 : 1}`}
                               >
                                  {item?.cantidad}
                             </span>
                          </div> : ''
              )}
          </Button>
      </>
    )
}

export default AddToCartButton;
