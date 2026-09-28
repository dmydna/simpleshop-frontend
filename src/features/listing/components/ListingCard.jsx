import StatusPill from "@/components/common/StatusPill";
import ProductButtonBar from "@/features/listing/components/ProductButtonBar";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


function ListingCard({ children, className, cols, imgSize, ...item}){

    return(
        <Col className={`d-flex flex-column p-0  
          ${cols ? cols : 'col-12 col-sm-6 col-md-4 col-lg-3'}`}>

           <Card className={`${className || 'm-2'}`}>

              <ProductButtonBar item={item} />

              <Link 
                className="text-decoration-none text-reset p-0"
                to={`/products/${item?.id}/${encodeURIComponent(item.title)}`}
              >
              <Card.Img   
                    src={item.thumbnail || "https://dummyimage.com/300x300/fff/000&text=Image+not+found"}
                    style={{ 
                      objectFit: 'contain', 
                      height: imgSize || '180px', 
                      padding: "1rem" 
                    }}
              />
              <Card.Body>
                <Card.Title 
                    className={`text-truncate-2 hover-link mb-2 fs-6 fw-medium `}
                    style={{
                      height: "3.2rem", 
                      overflow: "hidden", 
                      textDecoration: "none", 
                    }}
                >
                   {item.title || "N/A"}
                </Card.Title>
                {item?.finalPrice != item?.price &&
                  <Card.Text style={{marginTop: '-15px'}} className="mb-0 small text-secondary position-absolute">
                    <strike>$ {item?.price}</strike>
                  </Card.Text> 
                }
                <Card.Text className="fs-3 fw-medium  mb-1">
                  $ {item?.finalPrice || "..."}  
                  <span className="mx-2 text-success fw-medium fs-6">
                    {item?.discountPercentage ? item.discountPercentage + '% OFF' : ''}
                  </span>
                </Card.Text>
                <Card.Text className="small fw-medium text-secondary">
                  <StatusPill status={item.availabilityStatus} />
                  {/*{item.availabilityStatus || "N/A"}*/}
                </Card.Text>
              </Card.Body>
              </Link>
              <div className="d-flex p-2">
                {children}
              </div>
            </Card>
        </Col>
    )
}

export default ListingCard
