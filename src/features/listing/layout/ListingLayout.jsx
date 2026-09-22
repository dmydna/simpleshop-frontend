import { PageLayout } from "@/components/layout/PageLayout";
import ListingActions from "@/features/listing/components/ListingActions";
import ListingFilter from "@/features/listing/components/ListingFilter";
import { useValidParams } from "@/hooks/useValidParams";
import { URL_LISTING_LIST } from "@/utils/links";
import ModalParam from "@common/ModalParam";
import ParamGuard from "@common/ParamGuard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import ListingCardEntity from "@/features/listing/components/ListingCardEntity"



export default function ListingLayout({ children }) {


    // -- PARAM VALIDATIONS --

    const VALID_PARAM_MODES = ['view', 'create', 'edit', 'draft', 'edit.draft']
    const VALID_PARAM_STATUS = ['ACTIVE', 'INACTIVE', 'DELETED', 'DRAFT']

    useValidParams({
        id: (val) => val != null, // Solo números
        mode: (val) => VALID_PARAM_MODES.includes(val), // Solo valores permitidos
        status: (val) => VALID_PARAM_STATUS.includes(val),
    }, { redirect: URL_LISTING_LIST });

    return (
        <ProtectedRouteAdmin>

            <PageLayout>
                <PageLayout.Card>
                    <ListingCardEntity />
                </PageLayout.Card>

                <PageLayout.Sidebar>

                    <ParamGuard param="id||hash||mode">
                        <ListingActions/>
                    </ParamGuard>
                    <ParamGuard param="id||hash||mode" inverse>
                        <ListingFilter/>
                    </ParamGuard>

                </PageLayout.Sidebar>

                <PageLayout.Main>
                    {children}
                </PageLayout.Main>  

                <PageLayout.Toolkit>

                    <ModalParam param="dialog=action">
                        {(close) =>
                            <ListingActions className={"border p-3 island rounded-4 shadow-none"}
                                close={() => close()}
                            />}
                    </ModalParam>
                    <ModalParam param="dialog=filter">
                        {(close) => <ListingFilter className={"border p-3 island rounded-4 shadow-none"}
                            close={() => close()} />}
                    </ModalParam>

                </PageLayout.Toolkit>    

            </PageLayout>  

        </ProtectedRouteAdmin>
    )
}

