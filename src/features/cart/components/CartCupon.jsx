import React, { useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCart } from "@f/cart/contexts/CartContext.jsx";

function CartCupon({title, check, onCheck}){

    const [query, setQuery] = useState(""); 
    const [placehoder, setPlacehoder] = useState("Ingresa cupon..")
    const [error, setError] = useState(false)
    const {couponDiscount, setCouponDiscount} = useCart()
    const [hide, setHide] = useState(false)

  
    
    function handleChange(e) {
      const value = e.target.value;
      setQuery(value.toUpperCase());
    }
  
    function handleSubmit(e){
      e.preventDefault();
      if(query === '#MISHA123' && !check){
        toast.success("Cupon aplicado!", { theme: 'colored' });
        setPlacehoder("Ingresa cupon...")
        setQuery("")
        onCheck(true)
        setError(false)
        setCouponDiscount(true)
      }else{
        setError(true)
        setPlacehoder("Cupon invalido...")
        setQuery("")
      }
    }
  


    return(
        <Card className={`m-2 p-4  island  ${hide ? 'd-none': ''}`} >
        <div className="h5 fw-bold text-secondary">
            <div className="d-flex justify-content-between">
                <span>{title}</span>
                <i onClick={()=>setHide(prev=>!prev) } className="btn bi bi-x-lg"></i>
            </div>

        </div>
        <Form onSubmit={handleSubmit} className={(error ? 'form-error': '')}>
        <InputGroup className="align-items-center">
        <input
           placeholder={placehoder}
           type="text"
           className={`form-control no-focus text-secondary`}
           value={query.toUpperCase()}
           spellCheck="false"
           onChange={handleChange}
        ></input>
          <Button
            onClick={(e)=> handleSubmit(e)}
            variant="danger"
          >Ingresar
          </Button>
         </InputGroup>
        </Form>
      </Card>
    )
}

export default CartCupon;
