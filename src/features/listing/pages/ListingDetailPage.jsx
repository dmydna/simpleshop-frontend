import BreadCrumb from "@/components/layout/BreadCrumb.jsx";
import CarouselGrid from "@/features/listing/components/CarrouselGrid";
import ProductBuyCard from "@/features/listing/components/ListingDetail/ProductBuyCard.jsx";
import ProductSpecs from "@/features/listing/components/ListingDetail/ProductSpecs.jsx";
import { listingService } from "@/features/listing/services/listingService.js";
import CarrouselReviews from "@/features/review/components/CarrouselReviews.jsx";
import { useFetchElem } from "@/hooks/useFetchElem.js";
import { AppStatus } from "@components/common/AppStatus.jsx";
import CarouselImages from "@components/common/CarouselImages.jsx";
import { DetailsPlaceholder } from "@features/placeholder/DetailsPlaceholder.jsx";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";




function ListingDetailPage() {


   const { hash } = useParams()
   const { loading, error, currentItem, fetchDataByHash, setId } 
   = useFetchElem({ fetchMethod: (id) => listingService.getByHash(id, true) })

    window.scrollTo({ top: 0, behavior: 'instant'});

   useEffect(() => {
      setId(hash)
   }, [hash, setId])


   return (
      <AppStatus
         loading={loading}
         onRetry={fetchDataByHash}
         error={error}
         placeholder={<DetailsPlaceholder />}
      >
         <Container fluid="xl" className="bg-white rounded mt-2 pt-2">
            <>
               {
               !currentItem ?
                  '' :
                  <>
                     <Row className="g-3" key={currentItem.id}>

                        <BreadCrumb
                           tags={currentItem.tags || []}
                           category={currentItem.category}
                        />

                        {/** Carrousel */}
                        <Col sm={12} md={7}>
                           <CarouselImages
                              order={true}
                              className="m-0"
                              col={1}
                              images={currentItem.images}>
                           </CarouselImages>
                        </Col>

                        {/**Buy Card */}
                        <Col style={{ top: '60px' }} className="sticky-md-bottom" xs={12} md={5}>
                           <ProductBuyCard
                              {...currentItem}
                              className='p-3f border island h-100' 
                           />
                        </Col>

                        {/**Product Specs */}
                        <Col className="mt-3 mt-5 mx-0" sm={12} md={7}>
                           <Col md={12} className='p-3f border island rounded-4' >
                              <ProductSpecs producto={currentItem} >
                                 <div className="fs-5 fw-medium mb-3">
                                    Características del producto
                                 </div>
                              </ProductSpecs>
                           </Col>
                        </Col >

                        {/**Product Description */}
                        <Col className="small mt-3 mx-0" xs={12} md={7}  >
                           <Col md={12} style={{ minHeight: "220px" }} className='p-3f border island rounded-4' >
                              <div className="fs-5 fw-medium mb-5">Descripcion</div>
                              <p className="text-secondary">
                                 {currentItem.description || '...'}
                              </p>
                           </Col>
                        </Col >

                        {/**Product Reviews */}

                        {currentItem.reviews && (
                           currentItem.reviews.length > 0 && (
                              <Col className="mt-3 mx-0" xs={12} md={7}>
                                 <Col md={12} className='p-3f border island rounded-4' >
                                    <CarrouselReviews
                                        title={"Reseñas"}
                                        size={2}
                                        reviews={currentItem.reviews} 
                                    />
                                 </Col>

                              </Col>

                           )
                        )}
                     </Row>
                     {/** Carousels  */}
                     <Row className="g-0">
                        <CarouselGrid
                           className="mx-0 my-3 p-3f border island rounded-4"
                           filter={{ category: currentItem.category }}
                           blacklist={[currentItem.id]}
                           maxCols={4}
                           imgSize={140} >
                           <h3 className="fs-5 fw-medium pb-0 m-0 ">Productos similares</h3>
                           <Link to={`/products?category=${currentItem.category}`}
                              className="text-decoration-none fw-bold">
                              Ver mas
                           </Link>
                        </CarouselGrid>
                     </Row>
                  </>
               }
            </>
         </Container>
      </AppStatus>
   );
}

export default ListingDetailPage
