import { PageLayout } from "@/components/layout/PageLayout";
import ProductActions from "@/features/product/components/ProductActions";
import ProductFilter from "@/features/product/components/ProductFilter";
import { statsService } from "@/features/stats/services/statsService";
import { useFetchTrigger } from "@/hooks/useFetchTrigger";
import { useUrlParams } from "@/hooks/useUrlParams";
import ModalParam from "@common/ModalParam";
import ParamGuard from "@common/ParamGuard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import { useMemo } from "react";
import ProductCardEntity from "../components/ProductCardEntity";


export default function ProductLayout({ children }) {

    return (
        <ProtectedRouteAdmin>

            <PageLayout>

                <PageLayout.Card>

                    <ProductCardEntity />

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

                </PageLayout.Toolkit>

                <PageLayout.Main>
                    {children}
                </PageLayout.Main>    

            
            </PageLayout>
        </ProtectedRouteAdmin >
    )
}