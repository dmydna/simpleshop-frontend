import ButtonCrud from "@/components/common/ButtonCreate";
import { useUrlParams } from "@/hooks/useUrlParams";
import { CRUD } from "@/utils/enums";
import { ListingDTO } from "@/utils/schemas";


export default function UpdateButton({update, handleAction}){
	
	const validation = ListingDTO;

    const { editMode } = useUrlParams();

    const handle = async (data, selectedFile = null) => {
        await update(data.id, data, selectedFile)
    }

	return (
	    <ButtonCrud
            icon="bi-pencil"
            title="Save Changes"
            visible={ editMode }
            handle={ () => handleAction(handle, validation) }
        />
	)
}