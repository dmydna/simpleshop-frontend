import { useWindowsWidth } from "@contexts/useWindowSize.jsx";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { useMemo } from "react";
import { Card } from "react-bootstrap";
import { useMatch } from "react-router-dom";

export const MyOrderCart = () => {

    const {totalPrice,totalDiscount, cartItems, cartCount,  couponDiscount} = useCart()

    const totalAmountDiscounts = useMemo(() => {
        let result = 0;

        for (let { finalPrice, discountPercentage, cantidad } 
            of cartItems || []) {

            const qty = Number(cantidad) || 0;
            if (qty === 0) continue;

            const percent = Number(discountPercentage) || 0;
            if (percent <= 0) continue; 

            const decimalDiscount = percent / 100;
            if (decimalDiscount >= 1) { continue; }

            const priceOriginal = finalPrice / (1 - decimalDiscount);
            const totalOriginal = priceOriginal * qty;
            const totalPaid = finalPrice * qty;
            const discountAmount = totalOriginal - totalPaid;

            result += discountAmount;
        }

        return result;
    }, [cartItems]);

    const Order = useMemo(() => {
        const cupontDiscount = couponDiscount ? 5.0 : 0;
        const envio = 0.0;
        return ({
            envio: envio,
            descuento: totalDiscount + cupontDiscount,
            subtotal: totalPrice,
            total: totalPrice + envio - totalDiscount - cupontDiscount
        });
    }, [couponDiscount, totalDiscount, totalPrice]);

    return (
        <Card className={`mx-0 mt-3 mt-md-0 mx-md-2 p-3 island`} >
            <Card.Text className="h5 fw-bold text-secondary py-2">
                My order
            </Card.Text>
            <hr/>

            {/* SUBTOTAL */}
            <div className="d-flex align-items-center justify-content-between py-2">
                <Card.Text className="text-secondary small fw-semibold  m-0">
                    Subtotal ({cartCount} unidades)</Card.Text>
                <Card.Text className="fw-bold">
                    ${Order.subtotal?.toFixed(2)}
                </Card.Text>
            </div>

            {/* DESCUENTOS */}
            <div className="d-flex align-items-center justify-content-between py-2">
                <Card.Text className="text-secondary small fw-semibold  m-0">
                     Descuentos </Card.Text>
                <Card.Text className="fw-bold">
                    - ${totalAmountDiscounts.toFixed(2)}
                </Card.Text>
            </div>

            {/* ENVIO */}
            <div className="d-flex align-items-center justify-content-between py-2">
                <Card.Text className="text-secondary small fw-semibold  m-0">
                     Envio</Card.Text>
                <Card.Text className="fw-bold small text-success">
                    Gratis
                </Card.Text>
            </div>
            <hr/>

            {/* TOTAL */}
            <div className="d-flex align-items-center justify-content-between pt-3 pb-4">
                <Card.Text className="hs-5 fw-bold m-0">TOTAL</Card.Text>
                <Card.Text className="h5 fw-bold">
                    ${Order?.total?.toFixed(2)}
                </Card.Text>
            </div>

        </Card>
    );
}
