import { Tintify } from "@/components/common/FloatButtonCollection";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';



function CartButton({style}){

    const {cartCount} = useCart();
    const navigate = useNavigate();

    return(
        <div onClick={()=> navigate('/cart')} className="position-relative">
            <Tintify style={{padding: '5px', ...style}} className="rounded-circle">
                <i className={`bi bi-cart3 fs-4`}></i>
            </Tintify>
               {cartCount != 0 ? 
                    <Badge 
                        bg="dark"
                        className="rounded-circle position-absolute" 
                        style={{ right: cartCount > 9 ? 0 : 5, top: 5,  zIndex:100,  padding: '2px 5px' }}
                    >
                    {cartCount}
                    </Badge>
                : ''} 
        </div>
    )
}

export default CartButton;