import CardEntity from "@/components/common/CardEntity";
import { PageLayout } from "@/components/layout/PageLayout";
import { statsService } from "@/features/stats/services/statsService";
import BanUser from "@/features/user/components/BanUser";
import UserActions from "@/features/user/components/UserActions";
import UserFilter from "@/features/user/components/UserFilter";
import { useFetchTrigger } from "@/hooks/useFetchTrigger";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useValidParams } from "@/hooks/useValidParams";
import { URL_USER_LIST } from "@/utils/links";
import ModalParam from "@common/ModalParam";
import ParamGuard from "@common/ParamGuard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Toaster } from 'react-hot-toast';
import UserCardEntity from "@features/user/components/UserCardEntity"

export default function UserLayout({ children }) {


    const { idParam, modeParam } = useUrlParams()

    const { data } = useFetchTrigger({ 
        fetchMethod: statsService.getStatsByField, 
        initialTriggers: { field: "status", entity: "users" } 
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

                    <Toaster duration="7000" position="bottom-length" />
                </PageLayout.Toolkit>                        

                
            </PageLayout>
        </ProtectedRouteAdmin>
    )
}