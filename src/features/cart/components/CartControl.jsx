import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import CartInput from "./CartInput";

export default function CartControl({ producto, className, style }) {


  const { removeFromCart,
      decreaseCartItem, 
      increaseCartItem,
      setCantidadCartItem
  } = useCart();

  const [cantidad, setCantidad] = useState(!producto.cantidad ? 0 : producto.cantidad)


  const incCart = (producto)=>{
    setCantidad((prev)=> 
      prev >= 0 && prev <= producto.stock ? 
    (!producto.cantidad ? prev : producto.cantidad) + 1 : 0)
    if(producto.cantidad){
      increaseCartItem(producto);
    } 
  }

  const decCart = (producto)=>{
    setCantidad((prev)=> prev > 0 && prev <= producto.stock ?  
    (!producto.cantidad ? prev : producto.cantidad)  - 1 : 0 )
    if(producto.cantidad){
      decreaseCartItem(producto);
    }

  }

  const elimItem = (producto) => {
    setCantidad(0)
    if(producto.cantidad || producto.cantidad == 0){
      removeFromCart(producto)
    }
  }



  const handleChange = (e) => {
     // actCart(producto,e);
     const inputValue = e.target.value;
     const val = parseInt(inputValue );

    if (inputValue === "") {
      setCantidad(1); 
      setCantidadCartItem(producto, 1)
      return
    }

    if(val > producto.stock){
      setCantidad(producto.stock); 
      setCantidadCartItem(producto, producto.stock)
      return
    }

     setCantidad(val);
     setCantidadCartItem(producto, val)
  }


  return (

    <div style={style} className={className}>
        <CartInput 
          quantity={cantidad}
          incCart={() => incCart(producto)}
          decCart={() => decCart(producto)}
          delCart={() => elimItem(producto)}
          onChange={(e) => handleChange(e)}
        />
    </div>

    
  );
}
