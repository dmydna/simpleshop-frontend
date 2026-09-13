import OffCanvasSidebar from "@/components/common/OffCanvasSidebar";
import { PageLayout } from "@/components/layout/PageLayout";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import CardProfile from "@f/profile/components/CardProfile";
import SidebarProfile from "@f/profile/components/SidebarProfile";
import { useProfile } from "@f/profile/contexts/ProfileContext";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from 'react-router-dom';



const ProfileLayout = () => {

    const { user } = useAuthContext()
    const { fetchData, profile } = useProfile()

    /*    useEffect(() => {
            fetchData()
        }, [])*/

    return (
        <PageLayout>
            

            {/** -- CARD --- */}
            <PageLayout.Card>
                <CardProfile name={user} />
            </PageLayout.Card>
            
            {/** -- SIDEBAR --- */}
            <PageLayout.Sidebar>
                <SidebarProfile role={profile?.role} />
            </PageLayout.Sidebar>

            {/** -- PAGE CONTENT --- */}
            <PageLayout.Main>
                <Outlet />
            </PageLayout.Main>    

            {/** -- MOBILE OFFCANVAS-MENU --- */}
            <PageLayout.Toolkit>

                <OffCanvasSidebar title={"User"} >
                    <SidebarProfile
                        role={profile?.role}
                    />
                </OffCanvasSidebar>
            
            </PageLayout.Toolkit>
        </PageLayout>
    )
}


export default ProfileLayout;