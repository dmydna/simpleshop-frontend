import { Alert, Card } from "react-bootstrap";
import { useOrderDetailContext } from "@f/order/contexts/OrderDetailContext";
import { useEffect, useState } from "react";
import { useUrlState } from "@/hooks/useUrlState";
import OrderTable from "@f/order/components/OrderTable";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useNavigate } from "react-router-dom";
import { IconTint } from "@/components/common/FloatButtonCollection";

export const MyOrderList = ({ className }) => {
  const { currentOrder, setShowReview } = useOrderDetailContext();
  const { searchParams, setSearchParams } = useUrlState();
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const { idParam, pageVersion } = useUrlParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentOrder) {
      setVisibleItems(currentOrder?.items || []);
    }
    if (idParam) {
      setVisibleItems(
        currentOrder?.items?.filter((item) => idParam == item.reviewId),
      );
    } else {
      setSelectedId(null);
      setVisibleItems(currentOrder?.items || []);
    }
    if (pageVersion) {
      setSearchParams((prev) => ({ ...prev, id: null }));
    }
  }, [idParam, selectedId, currentOrder]);

  return (
    <>
      <Card className={"border-0 p-0"}>
        <div className="d-flex align-items-center justify-content-between">
            <p className="h5 fw-bold pt-2">My order</p>
            <IconTint
              className={"rounded-circle"}
              action={() => navigate("/user/purchases")}
              icon={"three-dots"}
            />
        </div>
        <div className="my-2" />
        <OrderTable content={visibleItems} />
      </Card>
    </>
  );
};
