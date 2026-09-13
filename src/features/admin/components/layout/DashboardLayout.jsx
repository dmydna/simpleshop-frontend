import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import CardEntity from "@/components/common/CardEntity";
import OffCanvasSidebar from "@/components/common/OffCanvasSidebar";
import SidebarDashboard from "@/features/admin/components/SidebarDashboard";
import ProtectedRouteAdmin from "@common/ProtectedRouteAdmin";
import { PageLayout } from "@/components/layout/PageLayout";

function DashboardLayout({ children }) {

    return (
        <ProtectedRouteAdmin>
            <PageLayout>
                <PageLayout.Card>
                    <CardEntity 
                        offCanvas={true}
                        className={'d-flex'}
                        to={"#"}
                        title={"Dashboard"}
                        ico={"bi-gear"} 
                        description={"admin"} 
                        variant={"primary"} 
                    />
                </PageLayout.Card>
                <PageLayout.Sidebar>
                    <SidebarDashboard/>
                </PageLayout.Sidebar>    
                <PageLayout.Main>
                    {children ? children : <Outlet />}
                </PageLayout.Main>   
                <PageLayout.Toolkit>
                    <OffCanvasSidebar title={"Panel"} >
                        <SidebarDashboard />
                    </OffCanvasSidebar>
                </PageLayout.Toolkit>

            </PageLayout>           
        </ProtectedRouteAdmin>
    )
}

export default DashboardLayout;