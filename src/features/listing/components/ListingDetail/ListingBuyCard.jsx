import StarRating from "@/components/common/StarRating.jsx";
import StatusPill from "@/components/common/StatusPill";
import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import AdminFloatButton from "@/features/listing/components/Button/AdminFloatButton.jsx";
import BuyNowButton from "@common/BuyNowButton.jsx";
import { useCart } from "@f/cart/contexts/CartContext.jsx";
import { Card, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListingDetailStatus from "@/features/listing/components/ListingDetail/ListingDetailStatus"
import Pill from "@/components/common/Pill";
import CartControl3 from "@/features/cart/components/CartControl3"


export default function ListingBuyCard({ className, ...item }) {

  const { addToCart, cartItems } = useCart()
  const navigate = useNavigate()
  const { isAdmin } = useAuthContext();

  const handleClick = () => {
    navigate("/cart/buy");
    const finded = cartItems.find(i => i.id == item.id)
    if(!finded){
     addToCart({ ...item })
    }
  }

  return (
    <Card className={`${className}`}>

      <div style={{margin:'-12px 0px 12px' }} className="d-flex
        justify-content-between
        flex-wrap flex-fill">
        <div className="mt-2">
          <StarRating value={item.rating} size={20} /> {/* 17 */}
        </div>
        <AdminFloatButton className="bg-white d-flex"
        style={{ scale: '.9', height: '38px', zIndex: 10 ,marginRight: '-12px' }} item={item} />
      </div>

      <Card.Body className="p-0">
        <div className="d-flex justify-content-between w-100">
          <Card.Title>
            {item.title}
          </Card.Title>
        </div>

        <Card.Text className="h3 mb-3">$ {(Number(item?.price) || 0).toFixed(2) || '...'}
          <span className="mx-2 text-success fw-medium fs-6">
            {item?.discountPercentage ? item.discountPercentage + '% OFF' : ''}
          </span>
        </Card.Text>
        {(isAdmin &&
          <p className="mb-1">
          <Pill icon={"bi-box-seam"}
              variant={`${item?.stock ? 'pill-success': 'pill-danger'}`}
              children={`${item.stock ? 'stock ' + item.stock : "Out of Stock" }`}
          />
          <Pill icon={"bi-truck"}
            className={"mx-2"}
            variant={"pill-primary"}
            children={"Free Shipping"} />
          </p>
        )}

        {(!isAdmin &&
          <p className="mb-1">
            <StatusPill icon={"bi-box-seam"} status={item.availabilityStatus} />
            <Pill className={"mx-2"} icon={"bi-truck"} variant={"pill-primary"} children={"Free Shipping"} />
          </p>)}
        <Card.Text className="small text-primary fw-medium m-2 mb-4">
          {item.shippingInformation || '...'}
        </Card.Text>
      </Card.Body>
      <InputGroup className="w-100 align-items-center gap-2 flex-wrap">

          <ListingDetailStatus status={item?.meta?.status}>

              <CartControl3 className="flex-fill" producto={item}/>

              <BuyNowButton
                className={`m-0 w-100 ${item?.stock ? '': 'disabled'} p-2 fw-medium`}
                variante='primary'
                handle={handleClick}
              />
              
          </ListingDetailStatus>

      </InputGroup>
    </Card>
  );
}
