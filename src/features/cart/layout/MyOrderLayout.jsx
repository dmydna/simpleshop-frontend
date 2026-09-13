import CartNavButton from "@/features/cart/components/CartNavButton";
import { MyOrderCart } from "@features/cart/components/MyOrderCart.jsx";



function MyOrderLayout({createOrder, cartItems}) {

 
    const handleConfirmOrder = async() =>{
    	window.scrollTo({ top: 0, behavior: 'instant'});
    	createOrder.execute( cartItems );
    }

	return (

		<div style={{ top: '66px' }} className="sticky-md-top">
              
			<MyOrderCart />

			<div style={{ marginTop: '10px' }} className="border p-3 mx-0 mx-md-2 d-flex justify-content-center gap-3 island">

				<CartNavButton  
					visible={!createOrder.success} 
					handle={()=>handleConfirmOrder()}
					variant="light"
					title="Cancelar" 
				/>

				<CartNavButton  
					visible={!createOrder.success} 
					handle={()=>handleConfirmOrder()} 
					title="Continuar" 
				/>

			</div>
		</div>
	)
}

export default MyOrderLayout;