import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import ListingSection from "@/features/home/components/ListingSection.jsx";
import CardFeature from "@common/CardFeature";
import CardPromo from "@common/CardPromo";
import CouponModal from "@common/CouponModal";

import TopCarousel from "@/features/home/components/TopCarrousel";
import TopSection from "@/features/home/components/TopSection";
import { useListing } from "@/features/listing/hooks/useListing";
import ListingContextLayout from "@/features/listing/layout/ListingContextLayout";
import Img8 from "@assets/discount.png";
import Img2 from "@assets/dressing-table.png";
import Img1 from "@assets/lipstick.png";
import Img6 from "@assets/new-product.png";
import Img10 from "@assets/online-store.png";
import Img4 from '@assets/open-store.png';
import Img5 from "@assets/purchasing.png";
import Img3 from "@assets/snowman.png";
import BannerAds from "@common/BannerAds";
import { FeaturesPlaceholder } from "@features/placeholder/FeaturesPlaceholder.jsx";
import { PATHS } from "@utils/paths";


function HomePage() {

    const [showCupon, setShowCupon] = useState()
    const baseHook = useListing({autofetch: true});

    return (
        <ListingContextLayout
            {...baseHook}
            placeholder={<FeaturesPlaceholder/>}
        >
            <div>

                {/** Features */}

                <div className="bg-heaven">
                    <Container fluid="xl">
                        <Row className="g-4 py-3 mb-3">
                            <CardFeature
                                title='Compra Protegida'
                                image= {Img5}
                                text='Podes devolver tu compra gratis'
                            />
                            <CardFeature
                                id={'cupon'}
                                title='Cupones'
                                image={Img8}
                                text='Descubri los mejores descuentos'
                            />
                            <CardFeature
                                title='Envios Express'
                                image= {Img6}
                                text='Recibi tu compra mas rapido'
                            />
                            <CardFeature
                                title='Tiendas oficiales'
                                image={Img4}
                                text='Encontra tus marcas preferidas'
                            />
                        </Row>
                    </Container>
                </div>


                {/** Banner ads */}

                <Container fluid="xl" className={``}>
                    <Row className="g-0">
                        <BannerAds
                            className={"bg-color-heaven rounded-4 mb-3 me-md-2 me-0"}
                            image={Img10}
                            btnText={'ver ofertas'}
                        >
                            <h5 className="mb-0"> Increibles Descuentos </h5>
                            <h5> usando la <b>App</b> </h5>
                        </BannerAds>
                        <BannerAds
                            image={Img3}
                            className={"bg-wave-0 rounded-4 mb-3 ms-md-2 ms-0"}
                            btnText={'ver marcas'}
                        >
                            <h5 className="mb-0"> Temporada Invierno </h5>
                            <h5> con <b>precios congelados</b> </h5>
                        </BannerAds>
                    </Row>
                </Container>

                <Container fluid="xl">

                    {/** Product Ilands */}

                    <Row className="g-0">
                        <TopSection
                            maxElems={4}
                            maxCols={4}
                            className="mb-3 p-3f island border rounded-4"
                            top="visits"
                        >
                            <p className="fs-5 fw-medium pb-0 m-0">Lo mas visto</p>
                            <Link to={'/products'} className="text-decoration-none fw-bold">ver mas</Link>
                        </TopSection>
                    </Row>


                    <Row className="g-0">
                        <Col className="p-0 mb-3" md={12} lg={4}>
                            <ListingSection
                                maxCols={1}
                                maxElems={1}
                                className="m-0 me-lg-3 p-3f island border rounded-4 "
                                filter={{ tags : ["vegetables"] }}
                            >
                                <p className="fs-5 fw-medium pb-0 m-0 ">Oferta del día</p>
                                <Link to="/products" className="text-decoration-none fw-bold">ver más</Link>
                            </ListingSection>
                        </Col>

                        <Col className="p-0 mb-3" md={12} lg={8}>
                            <TopSection
                                maxCols={3}
                                maxElems={3}
                                className="p-3f island border rounded-4"
                                top="onsale"
                            >
                                <p className="fs-5 fw-medium pb-0 m-0 ">Mejores Rebajas</p>
                                <Link to="/products" className="text-decoration-none fw-bold">ver más</Link>
                            </TopSection>
                        </Col>

                    </Row>


                    {/** Carousels  */}

                    <Row className="g-0">
                        <TopCarousel
                            className="mx-0 mb-3 p-3f island border rounded-4"
                            top="rated"
                            maxCols={4}
                            maxElems={8}>
                            <h3 className="fs-5 fw-medium pb-0 m-0 ">Mejor valorado</h3>
                            <Link to={'/products?category=groceries'}
                                  className="text-decoration-none fw-bold">
                                ver mas
                            </Link>
                        </TopCarousel>
                    </Row>


                    {/** Card Promos */}

                    <Row className="g-0">
                        <CardPromo className="mb-3 island rounded-4 me-md-1 me-0" Img={Img1} variant="primary bg-opacity-75" 
                            to={'/products/filter?category=beauty'} cta="comprar ahora">
                            <p className="mb-1">6 cuotas sin interés</p>
                            <p className="h5 fw-bold mb-1">HASTA 40% OFF EN</p>
                            <p className="h5 fw-bold">PERFUMES Y BELLEZA</p>
                        </CardPromo>
                        <CardPromo className="mb-3  island rounded-4 ms-md-1 ms-0" Img={Img2} variant="success" 
                            to={`${PATHS.products.filter}?category=furniture`} cta="ver ofertas">
                            <p className="mb-1">6 cuotas sin interés</p>
                            <p className="h5 fw-bold mb-1">2X1 EN ARTICULOS</p>
                            <p className="h5 fw-bold">PARA EL HOGAR</p>
                        </CardPromo>
                    </Row>


                </Container>
            </div>
            <CouponModal show={showCupon} onHide={setShowCupon}/>
        </ListingContextLayout>
        


    )

}

export default HomePage;
