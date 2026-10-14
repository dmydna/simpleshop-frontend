import { Form } from "react-bootstrap";
import userDefault from "/user-default-xs.png";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import StatusPill from "@/components/common/StatusPill";
import { IconTint } from "@/components/common/FloatButtonCollection";
import FormBanTime from "./FormBanTime";
import InputCrudFloating from "@/features/form/components/InputBaseFloating";


export default function FormCreateBan({ register, setValue, crudHook}) {
	
	return (
		<Form id='reviewForm' style={{ minHeight: '190px' }} >
			<Form.Group className="mb-3 w-100">

				<FormBanTime
					register={register} 
					setValue={setValue}
				/>

				<InputCrudFloating
					name={"banReason"}
					label={"Motivo del baneo"}
					placeholder={" "}
					as={"textarea"}
					{...crudHook}
				/>


			</Form.Group>
		</Form>
	)
}