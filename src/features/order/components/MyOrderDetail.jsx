import { Card } from "react-bootstrap";
import CartNavButton from "@/features/cart/components/CartNavButton";
import { useMemo } from "react";
import OrderDetail from "./OrderDetail";
import { useCart } from "@/features/cart/contexts/CartContext";

export const MyOrderDetail = ({ currentOrder, children }) => {
  const { cartCount } = useCart();
  const formatDate = ([year, month, day, hour, min]) => {
    const hh = hour > 12 ? "pm" : "am";
    return `${year}-${month}-${day} (${hour % 12}:${min} ${hh})`;
  };

  const totalAmountDiscounts = useMemo(() => {
    let result = 0;

    for (let {
      priceAtPurchase,
      discountPercentageAtPurchase,
      quantity,
    } of currentOrder?.items || []) {
      const qty = Number(quantity) || 0;
      if (qty === 0) continue;

      const percent = Number(discountPercentageAtPurchase) || 0;
      if (percent <= 0) continue;

      const decimalDiscount = percent / 100;
      if (decimalDiscount >= 1) {
        continue;
      }

      const priceOriginal = priceAtPurchase / (1 - decimalDiscount);
      const totalOriginal = priceOriginal * qty;
      const totalPaid = priceAtPurchase * qty;
      const discountAmount = totalOriginal - totalPaid;
      result += discountAmount;
    }

    return result;
  }, [currentOrder]);

  // TODO: <API> incluir subtotal en el pedido
  const subtotal = useMemo(() => {
    return currentOrder?.totalAmount + totalAmountDiscounts;
  }, [currentOrder, totalAmountDiscounts]);

  return (
    <OrderDetail
        className={"border-0"}
        title={"Order Details"}
        date={formatDate(currentOrder?.meta?.createdAt || []) || ""}
        subtotal={(Number(subtotal) || 0).toFixed(2)}
        operationNumber={currentOrder?.operationNumber}
        totalAmountDiscounts={(Number(totalAmountDiscounts) || 0).toFixed(2)}
        shipping={"Gratis"}
        totalQuantity={cartCount}
        totalAmount={(Number(currentOrder?.totalAmount) || 0).toFixed(2)}
      />
  );
};
