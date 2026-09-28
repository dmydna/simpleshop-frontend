import StarRating from "@/components/common/StarRating.jsx";
import StatusPill from "@/components/common/StatusPill";
import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import AdminFloatButton from "@/features/listing/components/Button/AdminFloatButton.jsx";
import BuyNowButton from "@common/BuyNowButton.jsx";
import AddToCartButton from "@f/cart/components/AddToCartButton.jsx";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { Card, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListingDetailStatus from "@/features/listing/components/ListingDetail/ListingDetailStatus"
import Pill from "@/components/common/Pill";


function ProductBuyCard({ className, ...item }) {

  const { addToCart } = useCart()
  const navigate = useNavigate()
  const { isAdmin } = useAuthContext();

  const handleClick = () => {
    navigate("/cart/buy");
    addToCart({ ...item })
  }

  return (
    <Card className={`${className}`}>
      <Card.Body className="p-0">
        <div className="d-flex justify-content-between w-100">
          <Card.Title>
            {item.title}
          </Card.Title>
          <AdminFloatButton style={{ height: '38px', margin: '-7px -10px 10px 10px' }} item={item} /> 
        </div>
        <StarRating value={item.rating} size={17} />
        <Card.Text className="h3 mb-3">$ {(Number(item?.price) || 0).toFixed(2) || '...'}
          <span className="mx-2 text-success fw-medium fs-6">
            {item?.discountPercentage ? item.discountPercentage + '% OFF' : ''}
          </span> 
        </Card.Text>
        {(isAdmin && 
          <Pill icon={"bi-box-seam"} 
                variant={"pill-success"} 
                children={`stock ${item.stock}`}
          />
        )}
        {(!isAdmin && 
          <p className="mb-1">
            <StatusPill icon={"bi-box-seam"} status={item.availabilityStatus} />
            <Pill className={"mx-2"} icon={"bi-truck"} variant={"pill-primary"} children={"Free Shipping"} />
          </p>)}
        <Card.Text className="small text-primary fw-medium m-2">
          {item.shippingInformation || '...'}
        </Card.Text>
      </Card.Body>
      <InputGroup className="w-100 align-items-center gap-2">
          <ListingDetailStatus status={item?.meta?.status}>
              {/** STATUS == ACTIVE (default) **/}
              <BuyNowButton
                className='m-0'
                variante='primary'
                handle={handleClick} 
              />
              <AddToCartButton className="m-0" product={item} /> 
          </ListingDetailStatus>            
      </InputGroup>
    </Card>
  );
}


export default ProductBuyCard;
