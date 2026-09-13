import CardEntity from "@/components/common/CardEntity";
import { PageLayout } from "@/components/layout/PageLayout";
import ProductActions from "@/features/product/components/ProductActions";
import ProductFilter from "@/features/product/components/ProductFilter";
import { statsService } from "@/features/stats/services/statsService";
import { useFetchTrigger } from "@/hooks/useFetchTrigger";
import { useUrlParams } from "@/hooks/useUrlParams";
import { URL_PRODUCT_LIST } from "@/utils/links";
import ModalParam from "@common/ModalParam";
import ParamGuard from "@common/ParamGuard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Toaster } from 'react-hot-toast';


export default function ProductLayout({ children }) {

    const { idParam, modeParam } = useUrlParams()

    const { data, loading, error } = useFetchTrigger({ 
        fetchMethod: statsService.getStatsByField, 
        initialTriggers: { field: "status", entity: "products" } 
    })

    const description = useMemo(() => {
        if (idParam) {
            return `# ${idParam}` 
        }
        if (Array.isArray(data)) {
            const { name, count } = data[0];
            return `${count} (${name.toLowerCase()})` 
        }
        return "";
          
    }, [idParam, data])


    return (
        <ProtectedRouteAdmin>

            <PageLayout>

                <PageLayout.Card>

                    <CardEntity
                        activeBack={modeParam}
                        to={URL_PRODUCT_LIST}
                        title={"Products"}
                        ico={"bi-box-seam"} 
                        description={description} 
                        variant={"success"} 
                    />

                </PageLayout.Card>

                <PageLayout.Sidebar>

                    <ParamGuard param="id||hash||mode">
                        <ProductActions/>
                    </ParamGuard>

                    <ParamGuard param="id||hash||mode" inverse>
                        <ProductFilter/>
                    </ParamGuard>
                                
                </PageLayout.Sidebar>    
     
                <PageLayout.Toolkit>

                    {/* -- Modal CRUD-ACTIONS -- */}
                    <ModalParam param="dialog=action">
                        {(close) => 
                            <ProductActions className={"border p-3 island rounded-4 shadow-none"}
                                close={() => close()} 
                            />}
                    </ModalParam>

                    {/* -- Modal LIST-FILTER -- */}
                    <ModalParam param="dialog=filter">
                        {(close) => <ProductFilter className={"border p-3 island rounded-4 shadow-none"}
                            close={() => close()} />}
                    </ModalParam>

                    <Toaster duration="7000" position="bottom-length" />
                </PageLayout.Toolkit>

                <PageLayout.Main>
                    {children}
                </PageLayout.Main>    

            
            </PageLayout>
        </ProtectedRouteAdmin >
    )
}