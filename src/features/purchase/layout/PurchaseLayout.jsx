// TODO unificar layout de cart, order-history, checkouts

import React, { Children } from "react";
import { Col, Container, Row } from "react-bootstrap";

PurchaseLayout.Sidebar = ({ children }) => children;
PurchaseLayout.Sidebar = ({ children }) => children;
PurchaseLayout.Card = ({ children }) => (
  <div className="p-3f island mb-2 border mt-0 mx-0 mx-lg-1 ">{children}</div>
);
PurchaseLayout.Main = ({ children }) => children;
PurchaseLayout.Detail = ({ children }) => children;
PurchaseLayout.Action = ({ children }) => children;
PurchaseLayout.Toolkit = ({ children }) => children;
PurchaseLayout.Header = ({ children }) => children


export function PurchaseLayout({ children }) {
  let sidebarNode = [];
  let mainContentNodes = [];
  let detailNodes = [];
  let toolkitNodes = [];

  Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    // Compara el tipo del elemento con los subcomponentes

    // child.props.id === 'sidebar'
    switch (child.type) {
      case PurchaseLayout.Sidebar:
        sidebarNode.push(child);
        break;
      case PurchaseLayout.Detail:
        detailNodes.push(child);
        break;
      case PurchaseLayout.Main:
        mainContentNodes.push(child);
        break;
      case PurchaseLayout.Toolkit:
        toolkitNodes.push(child);
        break;
    }
  });

  return (
    <Container fluid="xl" className="mt-4">
      <div className="h1 d-none">Cart</div>
      <Row className="g-0" md={4}>
        {/* MY CART */}
        <Col className={`col-12 col-md-12 col-lg-12 col-xl-7`}>
          <PurchaseLayout.Card>{mainContentNodes}</PurchaseLayout.Card>
        </Col>
        {/* DETAIL */}
        <Col className={`col-12 col-md-12 col-lg-12 col-xl-5`}>
          <div style={{ top: "66px" }} className="sticky-md-top">
            <div className="mb-2 p-3f island card mx-0 mx-lg-2">
              {detailNodes}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
