
import { MyOrderDetail } from "@/features/order/components/MyOrderDetail";
import { MyOrderList } from "@/features/order/components/MyOrderList";
import { OrderDetailProvider } from "@/features/order/contexts/OrderDetailContext";
import { useOrder } from "@/features/order/hooks/useOrder";
import { PurchaseLayout } from "@/features/purchase/layout/PurchaseLayout";
import FormReview from "@/features/review/components/FormReview";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useUrlState } from "@/hooks/useUrlState";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MyOrderStatus from "../components/MyOrderStatus";

export default function OrderDetailPage() {
  const { hash } = useParams();
  const { setOrderHash, currentOrder, refreshElem, setCurrentOrder } =
    useOrder();
  const { idParam, pageVersion } = useUrlParams();
  const [showReview, setShowReview] = useState(false);
  const { searchParams, setSearchParams } = useUrlState();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      setOrderHash(hash);
    }
    if (pageVersion) {
      refreshElem();
    }
  }, [hash, pageVersion]);

  const closeReview = () => {
    setSearchParams((prev) => ({ ...prev, id: null }));
  };

  return (
    <OrderDetailProvider
      {...{
        showReview,
        setOrderHash,
        setShowReview,
        currentOrder,
        setCurrentOrder,
      }}
    >
      <PurchaseLayout>
        <PurchaseLayout.Main>
          <MyOrderList />
        </PurchaseLayout.Main>
        <PurchaseLayout.Detail>
          { !idParam && <MyOrderDetail currentOrder={currentOrder} /> }
          { !idParam && <MyOrderStatus status={currentOrder?.status}  /> }
          { idParam  && <FormReview close={closeReview} /> }
        </PurchaseLayout.Detail>
        <PurchaseLayout.Toolkit>
          <ToastContainer />
        </PurchaseLayout.Toolkit>
      </PurchaseLayout>
    </OrderDetailProvider>
  );
}
