import { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { toast } from "react-toastify";


function CartInput2({ producto, className, style, size="md", disabled=false }) {


  const { removeFromCart, addToCartQuantity, cartItems } = useCart();

  const [cantidad, setCantidad] = useState(!producto.cantidad ? 0 : producto.cantidad)


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
  	setCantidad(findItem?.cantidad || 0)
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

      {/* Boton eliminar */}
      <Button
        disabled={disabled}
      	style={{minWidth: '35px'}}	
        className="btn btn-sm shadow-sm border rounded overflow-hidden pagination-input-group"
        variant="outline-dark"
        onClick={() => elimItem(producto)}
      ><i className="bi bi-trash3 smal pe-1"></i>
      </Button>

      <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">

        {/* Boton + */}
        <Button
          disabled={disabled}
          className="btn p-1 border-0 ps-3 btn-sm"
          onClick={() =>  decCart(producto) }
          variant
        ><i className="bi bi-dash-lg"></i>
        </Button>

        {/* InputCart */}
        <Form.Control
          disabled={disabled}
          type="text"
          value={cantidad}
          className="text-center border-0 fw-bold no-arrows"
          style={{ width: "30px", fontSize: "0.9rem", boxShadow: 'none' }}
        ></Form.Control>

        {/* Boton - */}
        <Button
          disabled={disabled}
          className="btn p-1 border-0 pe-3 btn-sm"
          onClick={() => incCart(producto)}
          variant
        ><i className="bi bi-plus-lg"></i>
        </Button>
   
      </InputGroup>

        <Button
          disabled={disabled}
        	style={{minWidth: '70px'}}
            className="btn btn-sm shadow-sm border rounded overflow-hidden"
            variant="success"
          onClick={() => { addItem(producto) }}
        > <small>{ btnTxt }</small>
        </Button> 

    </div>
    
  );
}

export default CartInput2;
