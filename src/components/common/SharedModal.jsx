import { BASE_URL } from "@/utils/api";
import CopyButton from "./CopyButton";
import ModalParam, { ModalParamHeader } from "./ModalParam";
import SocialButton from "@common/SocialButton"
import { useParams } from "react-router-dom";


export default function SharedModal() {


	const { hash } = useParams()

	return (
			<ModalParam size="md" param="dialog=shared">	
					<div className="p-3">

						<ModalParamHeader x> Share </ModalParamHeader>

						<div style={{maxWidth: '360px'}} className="mx-auto d-flex flex-wrap justify-content-between mb-3">

							<SocialButton social="facebook" visibleName />

							<SocialButton variant="success" social="whatsapp" visibleName />

							<SocialButton social="telegram" visibleName />

							<SocialButton variant="dark" social="discord" visibleName />
                	
						</div>

						<div 
							className="bg-tint d-flex border justify-content-center align-items-center rounded-3 my-2 px-2 ">

							<span style={{ overflowX: 'auto' }} 
								className="text-nowrap text-secondary flex-fill ">
								{BASE_URL}/p/{hash}
							</span>	
							<CopyButton showMessage={false} value={`${BASE_URL}/p/${hash}`} className={"text-center"} style={{ width: '40px' }} />

						</div>
					</div>
			</ModalParam>   
	)
}