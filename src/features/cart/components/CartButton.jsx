import { Tintify } from "@/components/common/FloatButtonCollection";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { useAuthContext } from "@features/auth/contexts/AuthContext";
import { useUrlState } from "@/hooks/useUrlState";
import { useCallback } from "react"
import { URL_LOGIN, URL_CART } from "@utils/links"
import BadgeCount from "@common/BadgeCount"

function CartButton({style}){

    const { cartCount } = useCart();
    const navigate = useNavigate();


    return(
        <div onClick={() =>navigate(URL_CART) } className="position-relative">
            <Tintify style={{padding: '5px', ...style}} className="rounded-circle">
                <i className={`bi bi-cart3 fs-4`}></i>
            </Tintify>
               {cartCount != 0 ? 
                    <BadgeCount quantity={cartCount} />
                : ''} 
        </div>
    )
}

export default CartButton;