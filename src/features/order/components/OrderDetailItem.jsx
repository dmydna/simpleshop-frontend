import { Card } from "react-bootstrap";

export default function OrderDetailItem({ title, detail, acent, bigger }) {
  const default_title = "text-secondary small fw-semibold m-0";
  const default_detail = acent
    ? `fw-semibold text-${acent}`
    : "small text-secondary fw-ligter";

  const bigger_title = bigger ? "h5 fw-semibold " : null;
  const bigger_detail = bigger ? `h5 fw-semibold text-${acent}` : null;

  return (
    <>
      {detail && (
        <div className="d-flex align-items-center justify-content-between py-2">
          <Card.Text className={bigger_title || default_title}>
            {title}
          </Card.Text>
          <Card.Text className={bigger_detail || default_detail}>
            {detail}
          </Card.Text>
        </div>
      )}
    </>
  );
}
