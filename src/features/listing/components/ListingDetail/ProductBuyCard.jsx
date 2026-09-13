import StarRating from "@/components/common/StarRating.jsx";
import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import AdminFloatButton from "@/features/listing/components/Button/AdminFloatButton.jsx";
import BuyNowButton from "@common/BuyNowButton.jsx";
import AddToCartButton from "@f/cart/components/AddToCartButton.jsx";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { Card, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function ProductBuyCard({ className, ...item }) {

  const { addToCart } = useCart()
  const navigate = useNavigate()
  const {isAdmin} = useAuthContext();

  const handleClick = () => {
    navigate("/cart/buy");
    addToCart( {...item} )
  }

  return (
    <Card className={`${className}`}>
      <Card.Body className="p-0">
        <div className="d-flex justify-content-between w-100">
          <Card.Title>
            {item.title}
          </Card.Title>
          <AdminFloatButton style={{height: '38px', margin: '-7px -10px 10px 10px'}} item={item}/> 
        </div>
        <StarRating value={item.rating} size={17}/>
        <Card.Text className="h3 mb-3">$ {(Number(item?.price) || 0).toFixed(2) || '...'}
          <span className="mx-2 text-success fw-medium fs-6">
            {item?.discountPercentage ? item.discountPercentage + '% OFF' : ''}
          </span> 
        </Card.Text>
        {(isAdmin && <p className="small text-secondary"><b>Stock </b>  { item.stock }</p>)}
        {(!isAdmin && 
          <p className="small text-secondary text-lowercase">
              <b>Availability </b>  { item.availabilityStatus }
          </p>)}
        <Card.Text className="small text-primary fw-medium mb-3">
          <i className="bi bi-truck"></i> {item.shippingInformation || '...'}
        </Card.Text>
      </Card.Body>
      <InputGroup className="w-100 align-items-center gap-2">
        {item?.meta?.status === "ACTIVE" && (
          <>
            <BuyNowButton
              className='m-0'
              variante='primary'
              handle={handleClick} 
            />
            <AddToCartButton className="m-0" product={item} /> 
          </>
        )}
        {item?.meta?.status === "INACTIVE" && 
            <div class="fade alert alert-primary show w-100">
              <i class="bi bi-info-circle me-2"></i>
              Publicacion <b>Pausada</b>
            </div>
        }
        {item?.meta?.status === "DRAFT" && 
            <div class="fade alert alert-primary show w-100">
              <i class="bi bi-info-circle me-2"></i>
              Publicacion <b>Borrador</b>
            </div>
        }
        {item?.meta?.status === "DELETED" && 
            <div class="fade alert alert-danger show w-100">
              <i class="bi bi-info-circle me-2"></i>
              Publicacion <b>Eliminada</b>
            </div>
        }
      </InputGroup>
    </Card>
  );
}


export default ProductBuyCard;
