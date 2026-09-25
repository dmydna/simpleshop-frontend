import CartNavButton from "@/features/cart/components/CartNavButton";

export default function MyOrderStatus({status}) {


  return (
    <div className="mt-3">
       <CartNavButton
        visible={true}
        variant="success disabled"
        title={status} //
        icon="bi bi-check-circle me-2"
      />
    </div>

  )
}
