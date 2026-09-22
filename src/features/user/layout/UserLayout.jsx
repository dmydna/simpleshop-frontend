import { PageLayout } from "@/components/layout/PageLayout";
import BanUser from "@/features/user/components/BanUser";
import UserActions from "@/features/user/components/UserActions";
import UserFilter from "@/features/user/components/UserFilter";
import { useValidParams } from "@/hooks/useValidParams";
import { URL_USER_LIST } from "@/utils/links";
import ModalParam from "@common/ModalParam";
import ParamGuard from "@common/ParamGuard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import UserCardEntity from "@features/user/components/UserCardEntity"

export default function UserLayout({ children }) {

    // -- PARAM VALIDATIONS --

    const VALID_PARAM_MODES = ['view', 'edit', 'create'];
    const VALID_PARAM_STATUS = ['ACTIVE', 'INACTIVE', 'BANNED', 'DELETED']

    useValidParams({
        id: (val) => val != null, 
        mode: (val) => VALID_PARAM_MODES.includes(val), // Solo valores permitidos
        status: (val) => VALID_PARAM_STATUS.includes(val), 
    }, { redirect: URL_USER_LIST });


    return (
        <ProtectedRouteAdmin>
            <PageLayout>

                <PageLayout.Card>
                    <UserCardEntity />
                </PageLayout.Card>    

                <PageLayout.Sidebar>
                    <ParamGuard param="id||hash||mode">
                        <UserActions />
                    </ParamGuard>
    
                    <ParamGuard param="id||hash||mode" inverse>
                        <UserFilter />
                    </ParamGuard>
                </PageLayout.Sidebar>

                <PageLayout.Main>
                    {children}
                </PageLayout.Main>

                <PageLayout.Toolkit>

                    {/** -- MODALS & TOAST --- */}

                    {/* -- ACTIONS -- */}
                    <ModalParam param="dialog=action">
                        {(close) => 
                            <UserActions className={"border p-3 island rounded-4 shadow-none"}
                                close={() => close()} 
                            />}
                    </ModalParam>

                    {/* -- USER-BAN -- */}
                    <ModalParam param="dialog=ban.update, ban.create" >
                        {(close) => <BanUser close={() => close()} />}
                    </ModalParam>

                    {/* -- FILTER -- */}
                    <ModalParam param="dialog=filter">
                        {(close) => <UserFilter className={"border p-3 island rounded-4 shadow-none"}
                            close={() => close()} />}
                    </ModalParam>

                </PageLayout.Toolkit>                        

                
            </PageLayout>
        </ProtectedRouteAdmin>
    )
}