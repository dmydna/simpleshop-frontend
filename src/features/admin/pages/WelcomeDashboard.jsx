import CarrouselScroll from "@/components/common/CarrouselScroll";
import MyActivity from "@/features/profile/pages/MyActivity";
import StatsOverview from "@/features/stats/components/StatsOverview";
import { Row } from "react-bootstrap";
import GetStarted from "../components/GetStarted";
import Header from "@/components/layout/Header";

function WelcomeDashboard() {


    return (
        <div>
            
            <Header  
                className={"border-0"}
                title={"Welcome to Dashboard"} 
                subtitle={"We ve' assambled some links to get started"} 
            />

            <Row className={`my-5 mb-2 d-md-flex`}> 

                <CarrouselScroll count={6} fix={0}>
                    <StatsOverview />
                </CarrouselScroll>

            </Row>




            <div className="row">
                <div className="col col-12 col-md-6 mb-4">
                    
                    <GetStarted />

                </div>

                <div className="col col-12 col-md-6">
                    <MyActivity />

                </div>
            </div>

        </div>
    )
}

export default WelcomeDashboard;