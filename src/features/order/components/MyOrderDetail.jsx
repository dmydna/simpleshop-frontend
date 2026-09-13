import { Card } from "react-bootstrap";
import CartNavButton from "@/features/cart/components/CartNavButton";
import { useMemo } from "react";


export const MyOrderDetail = ({ check, currentOrder, children }) => {
    
    const formatDate = ([year, month, day, hour, min]) => {
        const hh = hour > 12 ? 'pm' : 'am';
        return `${year}-${month}-${day} (${hour % 12}:${min} ${hh})`;
    }

    const totalAmountDiscounts = useMemo(() => {
        let result = 0;

        for (let { priceAtPurchase, discountPercentageAtPurchase, quantity } 
            of currentOrder?.items || []) {

            const qty = Number(quantity) || 0;
            if (qty === 0) continue;

            const percent = Number(discountPercentageAtPurchase) || 0;
            if (percent <= 0) continue; 

            const decimalDiscount = percent / 100;
            if (decimalDiscount >= 1) { continue; }

            const priceOriginal = priceAtPurchase / (1 - decimalDiscount);
            const totalOriginal = priceOriginal * qty;
            const totalPaid = priceAtPurchase * qty;
            const discountAmount = totalOriginal - totalPaid;

            result += discountAmount;
        }

        return result;
    }, [currentOrder]);

    return (
        <>
            <Card // style={{top: (width > 900 ? "55px" : 0)  }}
                className={`my-2 p-4 island card mx-0 mx-lg-2`} >
                <Card.Text className="h5 fw-bold text-secondary py-2">
                    Order Details
                </Card.Text>
                <hr />

                {/* SUBTOTAL */}
                <div className="d-flex align-items-center justify-content-between py-2">
                    <Card.Text className="text-secondary small fw-semibold  m-0">
                        Operacion </Card.Text>
                    <Card.Text className="fw-light small">
                        {currentOrder?.operationNumber}
                    </Card.Text>
                </div>

                {/* FECHA */}
                <div className="d-flex align-items-center justify-content-between py-2">
                    <Card.Text className="text-secondary small fw-semibold  m-0">
                        fecha y hora</Card.Text>
                    <Card.Text className="small fw-light">
                        {formatDate(currentOrder?.meta?.createdAt || []) || ''}
                    </Card.Text>
                </div>


                {/* SUBTOTAL */}
                <div className="d-flex align-items-center justify-content-between py-2">
                    <Card.Text className="text-secondary small fw-semibold  m-0">
                        Subtotal ({currentOrder?.totalQuantity} unidades)</Card.Text>
                    <Card.Text className="fw-bold">
                        ${(Number(currentOrder?.totalAmount) + Number(totalAmountDiscounts) || 0).toFixed(2) }
                    </Card.Text>
                </div>

                {/* DESCUENTOS */}
                <div className="d-flex align-items-center justify-content-between py-2">
                    <Card.Text className="text-secondary small fw-semibold  m-0">
                        Descuento (total) {check && '(1 cupon)'} </Card.Text>
                    <Card.Text className="fw-bold">
                        - $ { (Number(totalAmountDiscounts) || 0).toFixed(2)}
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
                <hr />

                {/* TOTAL */}
                <div className="d-flex align-items-center justify-content-between pt-3 pb-4">
                    <Card.Text className="hs-5 fw-bold m-0">TOTAL</Card.Text>
                    <Card.Text className="h5 fw-bold">
                        ${(Number(currentOrder?.totalAmount) || 0).toFixed(2)}
                    </Card.Text>
                </div>

            </Card>

            <div style={{ marginTop: '10px' }} className="border p-3 mx-0 mx-lg-2 d-flex justify-content-center gap-3 island">
                
                {!children && 
                <CartNavButton  
                    visible={true} 
                    variant="success disabled"
                    title={"ENTREGADO"} // 
                    icon="bi bi-check-circle me-2"
                />
                } 
                { children}
              
            </div>

        </>
    );
}
