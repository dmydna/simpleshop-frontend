import ButtonCrud from "@/components/common/ButtonCreate";
import { useUrlParams } from "@/hooks/useUrlParams";
import { CRUD } from "@/utils/enums";
import { ListingDraftDTO } from "@/utils/schemas";
import { useEffect } from "react";



export default function DraftButton({create, handleAction}){
	
	const validation = ListingDraftDTO;

    const { createMode } = useUrlParams();

    const handle = async (data, selectedFile = null) => {
        await create({ ...data, status: "DRAFT" }, selectedFile)
    }

	return (
	    <ButtonCrud
            icon="bi-plus"
            title="Draft"
            visible={createMode}
            handle={ () =>  handleAction(handle, validation) }
        />
	)
}