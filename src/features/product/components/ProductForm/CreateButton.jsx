import ButtonCrud from "@/components/common/ButtonCreate";
import { useUrlParams } from "@/hooks/useUrlParams";
import { CRUD } from "@/utils/enums";
import { ProductDTO } from "@/utils/schemas";



export default function CreateButton({create, handleAction}){
	

	const validation = ProductDTO;

    const { createMode } = useUrlParams();

    const handle = async (data) => {
        await create(data.id, data)
    }

	return (
	    <ButtonCrud
            icon="bi-send"
            title="Send"
            variant="dark"
            visible={ createMode }
            handle={ () =>  handleAction(handle, validation) }
        />
	)
}