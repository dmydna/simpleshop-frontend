import CarrouselScroll from "@/components/common/CarrouselScroll";
import MyActivity from "@/features/profile/pages/MyActivity";
import StatsOverview from "@/features/stats/components/StatsOverview";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GetStarted from "../components/GetStarted";

function WelcomeDashboard() {

    const navigate = useNavigate()

    return (
        <div>
            <div className="">
                <p className="fw-medium fs-5 mb-0">Welcome to Dashboard</p>
                <p className="text-secondary small">We ve' assambled some links to get started</p>
            </div>

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