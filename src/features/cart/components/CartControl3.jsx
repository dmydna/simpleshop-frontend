import { useState, useEffect, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { toast } from "react-toastify";
import NoticeStock from "@/features/listing/components/NoticeStock";
import ButtonSoft from "@/components/common/ButtonSoft";
import CartInput from "./CartInput";


export default function CartControl3({ producto, className, style, size = "md", disabled = false }) {

  const { removeFromCart, addToCartQuantity, cartItems } = useCart();

  const [cantidad, setCantidad] = useState(!producto.cantidad ? 0 : producto.cantidad)

  const incCart = (producto) => {
    setCantidad((prev) =>
      prev >= 0 && prev <= producto.stock ?
        (!producto.cantidad ? prev : producto.cantidad) + 1 : 0)
  }

  const decCart = (producto) => {
    setCantidad((prev) => prev > 0 && prev <= producto.stock ?
      (!producto.cantidad ? prev : producto.cantidad) - 1 : 0)
  }

  const elimItem = useCallback((producto) => {
    setCantidad(0)
    const finded = cartItems.find(item => item.id == producto.id);
    if (finded) {
      removeFromCart(producto)
      if (toast.isActive()) return;
      toast.success("Removed to cart!");
    }
  }, [cartItems, removeFromCart])


  const addItem = useCallback((producto) => {
    if (cantidad == 0) return;
    let isAddToCart = false;
    const finded = cartItems.find(item => item.id == producto.id);
    if (finded) {
      if (finded?.cantidad != cantidad) {
        isAddToCart = addToCartQuantity(producto, cantidad)
      }
    } else {
      isAddToCart = addToCartQuantity(producto, cantidad)
    }
    if (isAddToCart) {
      if (toast.isActive()) return;
      toast.success("Added to cart!", { theme: 'colored' });
    }
  }, [cartItems, cantidad])


  useEffect(() => {
    const findItem = cartItems.find(item => item.id == producto.id);
    setCantidad(findItem?.cantidad || 0)
  }, [cartItems])


  return (
    <>
      <div className="d-flex flex-wrap justify-content-between flex-fill">

        <div style={{minWidth: '220px'}} 
             className={`d-flex gap-2 my-2 flex-fill order-last order-sm-first`}>
             
            <CartInput 
              disabled={disabled}
              quantity={cantidad}
              delCart={() => elimItem(producto)}
              decCart={() => decCart(producto)} 
              incCart={() => incCart(producto)}
            />
        </div>

        <NoticeStock  stock={producto?.stock} />

      </div>

      <ButtonSoft
        disabled={disabled}
        style={{ minWidth: '200px' }}
        onClick={() => addItem(producto)}
      > 
        <i className="bi bi-cart2 fs-5"></i>
        <span className="mx-3">Add to Cart</span>
      </ButtonSoft>
    </>
  );
}
