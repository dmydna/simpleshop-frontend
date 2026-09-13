import { usePaymentContext } from "@/features/payment/contexts/PaymentContext";
import { URL_USER_ORDER } from "@/utils/links";
import { useNavigate } from "react-router-dom";

function MyCartLayout({cartItems, clearCart}) {
	
	const navigate = useNavigate();
	const { loading, error, setError, success, canceled, orderResponse } 
	= usePaymentContext()

	const handleSucess = () => {
		navigate(`${URL_USER_ORDER}/${orderResponse?.orderId}`)
		clearCart()
	}


	return (<></>)
}

export default MyCartLayout;