import { Button } from "react-bootstrap";
import { IconTintyColor } from "@/components/common/IconTintyColor";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "@/features/cart/contexts/CartContext";
import { checkout } from "@/utils/schemas";
import PageLoading from "@/features/fallback/pages/PageLoading";
import FallbackSuccess from "@/features/fallback/components/FallbackSuccess";
import FallbackError from "@/features/fallback/components/FallbackError";
import { useMemo } from "react";
import { check } from "zod";

export default function CancelOrderModal({ close }) {

    const { usefetch, loading, cancelPay } = useCheckout();

    const { orderId } = useParams();
    const { clearCart } = useCart();
    const navigate = useNavigate();


    const handleCancel = () => cancelPay(orderId, clearCart); 

    const checkout = useMemo(()=>{
        return usefetch
    },[usefetch])

    if(checkout?.loading){
        return <PageLoading message={"Eliminando pedido..."}/>
    }
    if(checkout?.success){
        const handleSuccess = () => navigate('/cart')
        return (
            <div className="my-3">
                <FallbackSuccess handle={handleSuccess}/>
            </div>
        )
    }
    if(checkout?.error){
        return (
        <FallbackError 
            handle={close}
            error={checkout?.error}
            className={"my-3"} 
        />
        )
    }

    return (
  
        <div className="text-center my-3">

            <div className='d-flex justify-content-end'>
                <span className='fs-5 fw-semibold visually-hidden'>
                    Cancel order
                </span>
            </div>

            <div className='d-block'>

                <IconTintyColor ico={"bi-cart-x"} size={80} fs={1} />

                <p className='fw-bold mb-0'>¿Cancelar Pedido?</p>
                <div className="my-3">
                    <p className='text-secondary m-0 small'>
                        Se eliminarán los productos del pedido.
                    </p>
                    <p className='text-secondary m-0 small'>
                        Esta acción no se puede deshacer.
                    </p>
                </div>
            </div>

            <div className='d-flex gap-3 justify-content-center my-2'>
                <Button className='btn-sm rounded-3 border' variant="light" onClick={close}>
                    Volver al pedido
                </Button>
                <Button className='btn-sm rounded-3 border' variant="dark" onClick={handleCancel}>
                    Cancelar pedido
                </Button>
            </div>

        </div>
    );
}
