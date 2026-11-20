import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { toast } from "react-toastify";
import CartInput from "@f/cart/components/CartInput";


export default function CartControl2({ producto, className, style, size="md", disabled=false, variant="primary" }) {


  const { removeFromCart, addToCartQuantity, cartItems } = useCart();

  const [cantidad, setCantidad] = useState(!producto.cantidad ? 1 : producto.cantidad )


  const incCart = (producto)=>{
    setCantidad((prev)=> 
      prev >= 0 && prev <= producto.stock ? 
    (!producto.cantidad ? prev : producto.cantidad) + 1 : 0)
  }

  const decCart = (producto)=>{
    setCantidad((prev)=> prev > 0 && prev <= producto.stock ?  
    (!producto.cantidad ? prev : producto.cantidad)  - 1 : 0 )
  }

  const elimItem = useCallback((producto) => {
    setCantidad(0)
    const finded = cartItems.find(item => item.id == producto.id);	
    if(finded){
       removeFromCart(producto)
       if (toast.isActive()) return;
       toast.success("Removed to cart!");
    }
  },[cartItems, removeFromCart])


  const addItem = useCallback((producto) => {
  	if(cantidad == 0) return; 
  	let isAddToCart = false;
	const finded = cartItems.find(item => item.id == producto.id);	
  	if(finded){
  		if(finded?.cantidad != cantidad){
  			isAddToCart = addToCartQuantity(producto, cantidad)
  		}
  	}else{
  		isAddToCart = addToCartQuantity(producto, cantidad)
  	}
  	if(isAddToCart){
  	   if (toast.isActive()) return;
	   toast.success("Added to cart!", { theme: 'colored' });
	}

  },[cartItems, cantidad])


  useEffect(()=>{
  	const findItem = cartItems.find(item => item.id == producto.id);
  	setCantidad(findItem?.cantidad || 1)
  },[cartItems])


  const btnTxt = useMemo(()=>{
  	let ret = ""
  	switch(size){
  	case "sm": ret = <i className="bi bi-cart3"></i>; break;
  	case "xl": ret = "Add to Cart"; break;	
  	default: // md
  		ret = "Add"; 	
  	}
  	return ret;
  },[size])


  return (
    <div style={style} className={`d-flex gap-2 my-2 ${className}`}>

        <CartInput
          disabled={disabled}
          quantity={cantidad}
          delCart={() => elimItem(producto)}
          decCart={() => decCart(producto)} 
          incCart={() => incCart(producto)}
        />

        <Button
          disabled={disabled}
        	style={{minWidth: '70px'}}
            className="btn btn-sm shadow-sm border rounded overflow-hidden"
            variant={variant}
          onClick={() => { addItem(producto) }}
        > <small>{ btnTxt }</small>
        </Button> 

    </div>
    
  );
}
