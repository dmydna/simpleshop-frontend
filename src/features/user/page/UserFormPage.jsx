import FormAccount from "@/features/user/components/UserForm/FormAccount";
import FormBasic from "@/features/user/components/UserForm/FormBasic";
import { useUserForm } from "@/features/user/hooks/useUserForm";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useEffect } from "react";
import FetchState from "@/components/common/FetchState";
import TitleForm from "@/components/common/TitleForm";
import CreateButton from "@/features/listing/components/ListingForm/CreateButton";
import UpdateButton from "@/features/listing/components/ListingForm/UpdateButton";

export default function UserFormPage() {

    const crudHook = useUserForm()
    const { loading, error, setError, success, setSuccess, setId, currentItem } = crudHook

    const { idParam } = useUrlParams()

    useEffect(() => {
        if (idParam) setId(idParam)
    }, [idParam])

    return (
        <FetchState.Modal 
            hook={{ loading, error, setError, success, setSuccess }} 
        >
            <>

                <TitleForm />

                <FormBasic className={"mb-4"} crudHook={crudHook} >
                    User Information
                </FormBasic>
            
                <FormAccount className={"mb-4"} crudHook={crudHook} >
                    Personal Information
                </FormAccount>
            
                <div className="d-flex mt-5 justify-content-center gap-3">
                    <CreateButton {...crudHook} />
                    <UpdateButton {...crudHook} />
                </div>    


            </>
        </FetchState.Modal>
    )
}
