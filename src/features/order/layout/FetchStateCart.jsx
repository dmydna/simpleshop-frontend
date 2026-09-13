import CartEmpty from "@/features/cart/components/CartEmpty";
import FallbackError from "@/features/fallback/components/FallbackError";
import FallbackSuccess from "@/features/fallback/components/FallbackSuccess";
import PageLoading from "@/features/fallback/pages/PageLoading";
import { MyOrderCartPlaceHoder } from "@/features/placeholder/MyOrderCartPlaceHolder";
import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FetchStateCart({ children, to, hook, isEmpty }) {
	
	const { loading, error, setError, success, setSuccess } = hook;
	const navigate = useNavigate();


	useEffect(() => {
		if (setSuccess) {
			setSuccess(false);
		}
		if (setError) {
			setError(null);
		}
	}, [])


	if (isEmpty) return <CartEmpty /> 

	if ((loading || error || success)) {
		return (
			<Container fluid="xl" className="mt-4">
				<div className="h1 d-none">Cart</div>
				<Row className="g-0" md={4}>
					{/* MY CART */}
					<Col className={`col-12 col-md-12 col-lg-12 col-xl-7`}>
						{loading &&
							<Card className="p-4 island mb-2 border">
								<PageLoading />
							</Card> 
						}
						{error && 
							<Card className="p-4 island mb-2 h-100 border">
			
								<FallbackError error={error} handle={() => setError(null)} />
							</Card>}
						{success && 
							<Card className="p-4 island mb-2 h-100 border">

								<FallbackSuccess handle={() => { if (to) { navigate(to) } setSuccess(null) }} />
							</Card>
						}
					</Col>
					{/* ORDER */}
					<Col className={`col-12 col-md-12 col-lg-12 col-xl-5`}>
						{(loading || error || success) && <MyOrderCartPlaceHoder />}
					</Col>
				</Row>
			</Container> 
		)
	}

	return children
}	