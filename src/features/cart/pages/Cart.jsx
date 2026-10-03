import { useCart } from "@features/cart/contexts/CartContext.jsx";
import FetchStateCart from "@/features/order/layout/FetchStateCart";
import { useAsync } from "@/hooks/useAsync";
import { orderService } from "@/features/order/services/orderService";
import { useNavigate } from "react-router-dom";
import { MyCart } from "../components/MyCart";
import { PurchaseLayout } from "@/features/purchase/layout/PurchaseLayout";
import CartAction from "../components/CartAction";
import { MyOrderCart } from "../components/MyOrderCart";

function Cart() {
  const cartHook = useCart();

  const navigate = useNavigate();

  const createOrder = useAsync(orderService.createMyOrder, {
    onSuccess: (order) => navigate(`/checkouts/${order.orderId}`),
  });

  return (
    <FetchStateCart
      hook={{ ...createOrder }}
      isEmpty={cartHook.cartItems?.length == 0}
    >
      <PurchaseLayout>
        <PurchaseLayout.Main>
          <MyCart className={"border-0"} {...cartHook} />
        </PurchaseLayout.Main>
        <PurchaseLayout.Detail>
          <MyOrderCart />
          <CartAction createOrder={createOrder} {...cartHook} />
        </PurchaseLayout.Detail>
      </PurchaseLayout>
    </FetchStateCart>
  );
}

export default Cart;
