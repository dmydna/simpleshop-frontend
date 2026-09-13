import ButtonCrud from "@/components/common/ButtonCreate";
import { useUrlParams } from "@/hooks/useUrlParams";
import { CRUD } from "@/utils/enums";
import { ListingDraftDTO } from "@/utils/schemas";


export default function UpdateDraftButton({update, handleAction, currentItem}){
	
	const validation = ListingDraftDTO;

    const { editMode } = useUrlParams();

    const handle = async (data, selectedFile = null) => {
        await update(data.id, data, selectedFile)
    }

	return (
	    <ButtonCrud
            icon="bi-pencil"
            title="Save Changes"
            visible={ editMode && currentItem.status == "DRAFT" }
            handle={ () => handleAction(handle, validation) }
        />
	)
}