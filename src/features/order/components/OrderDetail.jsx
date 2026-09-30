import Header from "@/components/layout/Header";
import OrderDetailItem from "@features/order/components/OrderDetailItem";
import { Card } from "react-bootstrap";

export default function OrderDetail({
  title,
  operationNumber,
  date,
  totalQuantity,
  subtotal,
  totalAmount,
  totalAmountDiscounts,
  shipping,
}) {
  return (
    <Card className={"border-0"}>

      <Card.Text className="h5 fw-bold text-secondary my-2">{title}</Card.Text>

      <hr />

      {/* OPERATION N° */}
      <OrderDetailItem title={"Operation n°"} detail={operationNumber} />

      {/* FECHA */}
      <OrderDetailItem title={"Date & Hour"} detail={date} />

      {/* SUBTOTAL */}
      <OrderDetailItem
        acent={"dark"}
        title={`Subtotal (${totalQuantity} units)`}
        detail={"$ " + subtotal}
      />

      {/* DESCUENTOS */}
      <OrderDetailItem
        acent={"dark"}
        title={`Discount (total)`}
        detail={"- $ " + totalAmountDiscounts}
      />

      {/* ENVIO */}
      <OrderDetailItem acent="success" title={`Shipping`} detail={shipping} />

      <hr />

      {/* TOTAL */}
      <OrderDetailItem
        bigger
        title={"TOTAL"}
        detail={"$ " + totalAmount}
        acent={"success"}
      />
    </Card>
  );
}
