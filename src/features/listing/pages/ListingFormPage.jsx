import FetchState from "@/components/common/FetchState";
import TitleForm from "@/components/common/TitleForm";
import MultiImageUploaderCrud from "@/features/form/components/MultiImageUploaderCrud";
import FormBasic from "@/features/listing/components/ListingForm/FormBasic";
import FormDetails from "@/features/listing/components/ListingForm/FormDetails";
import FormSku from "@/features/listing/components/ListingForm/FormSku";
import { useListingForm } from "@/features/listing/hooks/useListingForm";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useUrlState } from "@/hooks/useUrlState";
import { URL_LISTING_LIST } from "@/utils/links";
import CreateButton from "@features/listing/components/ListingForm/CreateButton";
import DraftButton from "@features/listing/components/ListingForm/DraftButton";
import UpdateButton from "@features/listing/components/ListingForm/UpdateButton";
import UpdateDraftButton from "@features/listing/components/ListingForm/UpdateDraftButton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ListingFormPage() {

    const baseHook = useListingForm()
    const { loading, error, setError, success, setSuccess, setId, currentItem } = baseHook

    const navigate = useNavigate()
    
    const {searchParams, setSearchParams} = useUrlState()

    const { idParam } = useUrlParams()

    useEffect(()=>{
        if(idParam) setId(idParam)
    },[idParam])

    const handleSuccess=()=>{
        navigate(URL_LISTING_LIST)
    }


    return (
        <FetchState.Modal 
            onSuccess={ handleSuccess }
            hook={{ loading, error, setError, success, setSuccess }} 
        >
            <>
                <TitleForm/>

                <FormBasic className={"mb-4"} baseHook={baseHook}>
                    General
                </FormBasic>
                <FormDetails className={"mb-4"} baseHook={baseHook}>
                    Details
                </FormDetails>
                <FormSku className={"mb-4"} baseHook={baseHook}>
                    Specs
                </FormSku>

                <MultiImageUploaderCrud className={"mb-4"} baseHook={baseHook}>
                    Images
                </MultiImageUploaderCrud>    


                <div className="d-flex mt-5 justify-content-center gap-3">
                    
                    <CreateButton      {...baseHook} />
                    <UpdateButton      {...baseHook} />
                    <UpdateDraftButton {...baseHook} />
                    <DraftButton       {...baseHook} />
                
                </div>


            </>
        </FetchState.Modal>
    )
}

export default ListingFormPage;
