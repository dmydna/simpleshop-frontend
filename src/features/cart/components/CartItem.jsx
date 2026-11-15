import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import CartControl from "@/features/cart/components/CartControl.jsx";

function CartItem({item, index}) {

    const {cartItems} = useCart()

    return (
            <Card  key={item.id} className="my-2 border-0">
              <div className="d-flex flex-wrap">
                <div className="mx-auto">
                  <Card.Img 
                   style={{ objectFit: 'contain', width : 80,height: 'auto' }}
                   className="border border-1 rounded"
                   src={item.thumbnail} />
                </div>
                <Col className="d-flex flex-fill">
                  <Card.Body className="ps-3 p-1">
                    <Card.Title as={Link}
                    className="d-block text-decoration-none fw-medium"
                    to={"../products/" + item.id + "/" + encodeURIComponent(item.title)} >
                      {item.title}
                    </Card.Title>

                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <CartControl className={'order-1 order-md-2'} producto={item}/>
                      <div className="text-secondary small m-0 d-none d-md-block">
                        <i className="bi bi-eye me-1"></i> 
                        stock: 
                        {item.stock - item.cantidad || 0}
                      </div>
                      <div className="text-secondary small m-0 d-none d-md-block">
                        p.u: 
                        <i className="bi bi-currency-dollar"></i>
                        {(item?.finalPrice || 0).toFixed(2)}
                      </div>
                      <div className="h5 m-0 order-2 order-md-1 mt-2 mt-sm-0">
                        <i className="bi bi-currency-dollar"></i> 
                        {(item.finalPrice*item.cantidad).toFixed(2)}
                      </div>
                    </div>
                    
                  </Card.Body>
                </Col>
              </div>
              <hr className={`${index ===  cartItems.length - 1 ? 'd-none' : ''}`}/>
            </Card>
        
    )
}

export default CartItem