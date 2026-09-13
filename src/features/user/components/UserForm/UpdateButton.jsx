import ButtonCrud from "@/components/common/ButtonCreate";
import { useUrlParams } from "@/hooks/useUrlParams";
import { CRUD } from "@/utils/enums";
import { ProductDTO } from "@/utils/schemas";



export default function UpdateButton({create, handleAction}){
	

	const validation = null;

    const { editMode } = useUrlParams();

    const handle = async (data) => {
        await create(data.id, data)
    }

	return (
	    <ButtonCrud
            icon="bi-send"
            title="Save Changes"
            variant="dark"
            visible={ editMode }
            handle={ () =>  handleAction(handle, validation) }
        />
	)
}