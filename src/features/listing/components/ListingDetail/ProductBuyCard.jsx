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
import CartInput2 from "@f/cart/components/CartInput2"
import AddToCartButton2 from "@/features/cart/components/AddToCartButton2";

export default function ProductBuyCard({ className, ...item }) {

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

      <div style={{marginTop: '-12px', marginBottom: '12px'}} className="d-flex
        justify-content-between
        flex-wrap flex-fill">
        <div className="mt-2">
          <StarRating value={item.rating} size={20} /> {/* 17 */}
        </div>
        <AdminFloatButton className="bg-white d-flex"
        style={{ height: '38px', zIndex: 10 }} item={item} />
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
              <AddToCartButton2
                className={`${item?.meta?.status !== "ACTIVE" ? 'disabled' : ''}`}
                variant="outline-success"
                product={item} />

              <BuyNowButton
                className={`m-0 w-100 ${item?.stock ? '': 'disabled'}`}
                variante='primary'
                handle={handleClick}
              />
          </ListingDetailStatus>

      </InputGroup>
    </Card>
  );
}
