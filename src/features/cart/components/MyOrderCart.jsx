import OrderDetail from "@/features/order/components/OrderDetail";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { useMemo } from "react";

export const MyOrderCart = () => {
  const { totalPrice, totalDiscount, cartItems, cartCount, couponDiscount } =
    useCart();

  const totalAmountDiscounts = useMemo(() => {
    let result = 0;

    for (let { finalPrice, discountPercentage, cantidad } of cartItems || []) {
      const qty = Number(cantidad) || 0;
      if (qty === 0) continue;

      const percent = Number(discountPercentage) || 0;
      if (percent <= 0) continue;

      const decimalDiscount = percent / 100;
      if (decimalDiscount >= 1) {
        continue;
      }

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
    return {
      envio: envio,
      descuento: totalDiscount + cupontDiscount,
      subtotal: totalPrice,
      total: totalPrice + envio - totalDiscount - cupontDiscount,
    };
  }, [couponDiscount, totalDiscount, totalPrice]);

  return (
    <OrderDetail
      className={"border-0"}
      title={"My order"}
      totalQuantity={cartCount}
      subtotal={Order.subtotal?.toFixed(2)}
      totalAmountDiscounts={totalAmountDiscounts.toFixed(2)}
      shipping={"Free"}
      totalAmount={Order?.total?.toFixed(2)}
    />
  );
};
