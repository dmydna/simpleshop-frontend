import ButtonCrud from "@/components/common/ButtonCreate";
import { useUrlParams } from "@/hooks/useUrlParams";
import { CRUD } from "@/utils/enums";
import { ListingDTO } from "@/utils/schemas";



export default function CreateButton({create, handleAction}){
	

	const validation = ListingDTO;

    const { createMode } = useUrlParams();

    const handle = async (data, selectedFile = null) => {
        await create(data.id, data, selectedFile)
    }

	return (
	    <ButtonCrud
            icon="bi-send"
            title="Send"
            variant="dark"
            visible={createMode}
            handle={ () =>  handleAction(handle, validation) }
        />
	)
}