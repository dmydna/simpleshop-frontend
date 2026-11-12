import { useListing } from "@/features/listing/hooks/useListing.js";
import { toCreateOrder } from "@/utils/mappers";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {


  // const {products, setProducts} = useListing();
  const [products, setProducts] = useState([])
  const [couponDiscount, setCouponDiscount] = useState(false)

  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0)

 
  const clearCart = () => {
    setCartItems([])
    setTotalPrice(0)
    setTotalDiscount(0)
    setCartCount(0)
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotalDiscount");
    localStorage.removeItem("cartTotalPrice");
    localStorage.removeItem("cartCount");
  }


  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    const savedTotalDiscount = localStorage.getItem("cartTotalDiscount");
    const savedTotalPrice = localStorage.getItem("cartTotalPrice");
    const savedCartCount = localStorage.getItem("cartCount");

    if (savedCartItems && savedTotalPrice && savedCartCount && totalDiscount) {
      setCartItems(JSON.parse(savedCartItems));
      setTotalPrice(JSON.parse(savedTotalPrice));
      setCartCount(JSON.parse(savedCartCount));
      setCartCount(JSON.parse(savedTotalDiscount));
    }
  }, []);


  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    if (totalPrice && totalPrice > 0) {
      localStorage.setItem("cartTotalPrice", JSON.stringify(totalPrice));
    }
    if (cartCount && cartCount > 0) {
      localStorage.setItem("cartCount", JSON.stringify(cartCount));
    }

  }, [cartItems, totalPrice, cartCount]);



  const removeFromCart = (productoCart) => {

    setCartCount((prevContador) => 
      prevContador == 0 ? 0 :  prevContador - 1)
    setTotalPrice((prevTotal) => 
      prevTotal - (productoCart.finalPrice * productoCart.cantidad))
    setTotalDiscount((prevTotal) => 
      prevTotal - (productoCart.price * productoCart.cantidad - productoCart.finalPrice * productoCart.cantidad))

    setCartItems((prevProductos) =>
      prevProductos.filter((item) =>
        item.id !== productoCart.id 
      ))

  }


  const setCantidadCartItem = (productoCart, value) => {
    // 1. Validar que el valor sea un número válido
    const nuevaCantidad = parseInt(value);
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) return;
  
    const totalDisponible = productoCart.stock + productoCart.cantidad;
    
    // Si el usuario pide más de lo que existe en total, limitamos al máximo
    const cantidadFinal = nuevaCantidad > totalDisponible ? totalDisponible : nuevaCantidad;
    const nuevoStockRestante = totalDisponible - cantidadFinal;
  
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productoCart.id 
          ? { ...item, cantidad: cantidadFinal } 
          : item
      )
    );
    const diferencia = cantidadFinal - productoCart.cantidad;

    // Actualizamos el contador global sumando la diferencia
    setCartCount((prevContador) => prevContador + diferencia)
    // 4. Actualizar Productos
  };


  const decreaseCartItem = (productoCart) => {

    const productoExiste = cartItems.find(
      (item) => item.id === productoCart.id 
    );

    if (productoCart.cantidad <= 0) {
      return;
    }
    setCartCount((prevContador) =>
      productoCart.stock ? prevContador - 1 : prevContador
    );
    

    setCartItems((prevProductos) =>
      prevProductos.map((item) =>
        item.id === productoCart.id && item.stock
          ? { ...item, cantidad: item.cantidad - 1 } // Incrementa la cantidad
          : item
      )
    );

  };

  const increaseCartItem = (productoCart) => {

    const esProductoDisponible = productoCart.stock - productoCart.cantidad != 0;

    if (!esProductoDisponible) {
      return;
    }


    const productoExiste = cartItems.find(
      (item) => item.id === productoCart.id 
    );



    if (productoCart.id)
      setCartCount((prevContador) =>
        productoCart.stock ? prevContador + 1 : prevContador
      );

    setCartItems((prevProductos) =>
      prevProductos.map((item) =>
        item.id === productoCart.id && item.stock
          ? { ...item, cantidad: item.cantidad + 1 } // Incrementa la cantidad
          : item
      )
    );
  }

const addToCartQuantity = (productoAAgregar, cantidad) => {
 
      if (productoAAgregar.stock <= 0) {
        return false
      }

      if (productoAAgregar.stock < cantidad){
        return false
      }

    
      const productoExiste = cartItems.find(
        (item) => item.id === productoAAgregar.id 
      );

      if (productoExiste) {
        //  actualiza la cantidad del producto
        setCartItems((prevProductos) =>
          prevProductos.map((item) =>
            item.id === productoAAgregar.id && item.stock 
              ? { ...item, cantidad: cantidad } // Incrementa la cantidad
              : item
          )
        );
      } else {
        setCartItems((prevProductos) => [ // retorno implicito de un array 
          ...prevProductos,
          { ...productoAAgregar, cantidad: cantidad },
        ]);
        setCartCount((prevCounter) => (
        productoAAgregar.stock ? prevCounter + 1 : prevCounter
      ));

      }





      return true;

    }


    const addToCart = (productoAAgregar) => {
 
      if (productoAAgregar.stock <= 0) {
        return
      }
    
      const productoExiste = cartItems.find(
        (item) => item.id === productoAAgregar.id 
      );

      if (productoExiste) {
        //  actualiza la cantidad del producto
        setCartItems((prevProductos) =>
          prevProductos.map((item) =>
            item.id === productoAAgregar.id && item.stock 
              ? { ...item, cantidad: item.cantidad + 1 } // Incrementa la cantidad
              : item
          )
        );
      } else {
        setCartItems((prevProductos) => [ // retorno implicito de un array 
          ...prevProductos,
          { ...productoAAgregar, cantidad: 1 },
        ]);
      }




      setCartCount((prevCounter) => (
        productoAAgregar.stock ? prevCounter + 1 : prevCounter
      ));

    }


    useEffect(() => {
      // // console.log(cartItems)
      if (cartItems.length != 0) {
        setTotalPrice(
          cartItems.reduce(
            (accumulator, item) => accumulator + item.finalPrice * item.cantidad
            , 0)
        );
        setTotalDiscount(
          cartItems.reduce(
            (accumulator, item) => accumulator + item.price * item.cantidad - item.finalPrice * item.cantidad
            , 0)
        );
      }
    }, [cartItems]);
  


    const orderData = useMemo(() =>
      toCreateOrder(cartItems), [totalPrice, cartItems]) 
    

    return (
      <CartContext.Provider 
        value={{  
          increaseCartItem,  
          decreaseCartItem, 
          removeFromCart, 
          cartItems, 
          setCartItems, 
          cartCount, 
          setCartCount,  
          totalPrice, 
          setTotalPrice, 
          setProducts, 
          products,
          clearCart,
          addToCart,
          addToCartQuantity,
          couponDiscount,
          setCantidadCartItem, 
          setCouponDiscount, 
          totalDiscount
        }}>
        {children}
      </CartContext.Provider>
    )
  }

export const useCart = () => useContext(CartContext);
