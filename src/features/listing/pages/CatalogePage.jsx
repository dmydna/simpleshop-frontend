import CatalogeFilter from "@/features/listing/components/CatalogeFilter.jsx";
import ListingCard from "@/features/listing/components/ListingCard.jsx";
import { useListingSync } from "@/features/listing/hooks/useCatalogeSync.js";
import { useListing } from "@/features/listing/hooks/useListing.js";
import ListingContextLayout from "@/features/listing/layout/ListingContextLayout.jsx";
import AddToCartButton from "@features/cart/components/AddToCartButton.jsx";
import AddToCartButtonToggle from "@/features/cart/components/AddToCartButtonToggle.jsx";
import Pagination from "@features/pagination/components/Pagination.jsx";
import { ListingPlaceholder } from "@features/placeholder/ListingPlaceholder.jsx";

import { Container, Row, Spinner } from "react-bootstrap";
import ListingDetailStatus from "../components/ListingDetail/ListingDetailStatus";
import FallbackNotSearchResults from "@features/fallback/components/FallbackNotSearchResults.jsx"

import CatalogeHeader from "@features/listing/components/CatalogeHeader"
import ModalParam, { ModalParamHeader } from "@/components/common/ModalParam";
import { useEffect, useMemo, useState } from "react";
import { useUrlParams } from "@/hooks/useUrlParams";


function Cataloge() {
    
  const baseHook = useListing({ autofetch: true, includeTags: true })
  const { listings, totalPages, totalElements } = baseHook;

  // Maneja los parametros de busqueda
  useListingSync({ ...baseHook });


  const [isMd, setMd] = useState(false)

  useEffect(()=>{
    setMd(window.innerWidth < 768) 
  },[window.innerWidth])

  return (
    <>
      <ListingContextLayout
        {...baseHook}
        placeholder={<ListingPlaceholder />}
      >
        <>
          <Container fluid="xl" className="rounded mt-2 mb-5 pb-5">

            <div className="d-none d-md-block">
              <CatalogeFilter />
            </div>

            <div className="pt-3">
              <CatalogeHeader {...baseHook} />
            </div>
            
            <Row>

              {baseHook?.loading && 
                <div className="p-5 my-5 vh-50 w-100 d-flex justify-content-center">
                  <Spinner variant={"primary"} /> 
                </div>
              }
              {!baseHook?.loading && listings?.map((p) => (
                <ListingCard className={'border m-2 p-2 island'}
                  {...p}
                  key={p.id}
                > 
                  <ListingDetailStatus 
                    status={p.meta.status}
                    className={"p-2 text-center text-uppercase my-2"} 
                  >
                    
                    <AddToCartButtonToggle 
                      className={`m-2 ${p.meta.status !== "ACTIVE" ? 'disabled' : ''}`} 
                      variant="success" 
                      product={p} />

                  </ListingDetailStatus>  
                </ListingCard>
              ))}
              {!baseHook?.loading && totalElements == 0 &&
                <div className="vh-50">
                  <FallbackNotSearchResults />
                </div>
              }
            </Row>
          </Container>
          {!baseHook?.loading && 
            <Pagination
              className={`container-xl`}
              totalPages={totalPages}
            />}

        <ModalParam className={"d-md-none"} size="md" param='show=filter'>
          
          <style>{`
            .fade.modal-backdrop.show {display:none}
            @media (max-width: 767.98px)  {  
              .fade.modal-backdrop.show {
                display: block;
              }
            }
            `}</style>

          <div className="p-3">
            <ModalParamHeader x>filter</ModalParamHeader>
            <CatalogeFilter />
          </div>
        </ModalParam>       
        </>
      </ListingContextLayout>
    </>
  )
}

export default Cataloge;
