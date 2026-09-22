import { Button } from "react-bootstrap";
import { IconTintyColor } from "@/components/common/IconTintyColor";
import { useCart } from "../contexts/CartContext";

function CartClearModal({ close }) {

  const { clearCart } = useCart() 

  return (
      <div className="my-3">

        <div className='d-flex justify-content-end'>
          <span className='fs-5 fw-semibold visually-hidden'>
            Vaciar cart
          </span>
        </div>

        <div className='d-block text-center'>

          <IconTintyColor ico={"bi-cart-x"} size={80} fs={1} />

          <p className='fw-bold mb-0'>¿Vaciar el carrito?</p>
          <p className='text-secondary my-4 small'>
            Se eliminarán todos los productos. <br></br>
            Esta acción no se puede deshacer.</p>
        </div>

        <div className='d-flex gap-3 justify-content-center my-2'>
          <Button className='btn-sm rounded-3 border' variant="light" onClick={close}>
            Cancelar
          </Button>
          <Button className='btn-sm rounded-3 border' variant="dark" onClick={clearCart}>
            Vaciar carrito
          </Button>
        </div>
      </div>


  );
}

export default CartClearModal;
