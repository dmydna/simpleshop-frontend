import { useEffect } from "react";

import { useUserForm } from '@/features/user/hooks/useUserForm';
import { CRUD } from "@utils/enums";
import { arrayToDate } from "@utils/mappers.js";
import { Button } from "react-bootstrap";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useUrlState } from "@/hooks/useUrlState";
import FetchState from "@/components/common/FetchState";
import userDefault from "/user-default-xs.png";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import StatusPill from "@/components/common/StatusPill";
import FormCreateBan from "./FormCreateBan";
import FormBanInfo from "./FormBanInfo";


// TODO: refactorizar componente baneo de usuario
// 1. se debe enviar dias de baneo (no fechas)
// 2. fronend calcula y muestra dias de baneo restantes 
function BanUser({ close }) {

    const { create_banMode, update_banMode, idParam } = useUrlParams()
    const { setSearchParams } = useUrlState();

    const crudHook = useUserForm(false);

    const { setCurrentItem, currentItem, setId, handleAction,
        loading, error, crudMode, reset, success, setError, 
        setSuccess, banUser, unbanUser, setCrudMode, 
        register, setValue } = crudHook;


    useEffect(() => {
        if (idParam) { 
            setId(idParam) 
            // Inicializa los campos del formulario
            reset({
                banExpiresAt: arrayToDate(currentItem?.meta?.banExpiresAt),
                banReason: currentItem?.meta?.banReason
            })
        } else { 
            setCurrentItem(null) 
        }

        if (create_banMode) {
            setCrudMode(CRUD.CREATE);
            reset({})
        }

        if (update_banMode) { setCrudMode(CRUD.READ) }

        //NOTA: al aceptar success se convierte en null (por FetchState)
        if (success == null) {
            // Actualizacion de estados:
            setSearchParams(prev => ({
                ...prev, 
                dialog: null,            // 1. Cierra el Modal.
                id: null,                // 2. Deselecciona elemento de tabla.
                tableVersion: Date.now() // 3. Refresca (refetch) tabla y sidebar.
            }))
        }
    }, [create_banMode, update_banMode, idParam, currentItem, success])



    const handleSubmit = async (data) => {
        await banUser(currentItem?.id, data);
    }

    const handleUnbanUser = async () => {
        await unbanUser(currentItem?.id);
    }


    return (
        <div className="p-3">

            <FetchState
                fluid
                hook={{ loading, error, setError, success, setSuccess }}
            >
                <>
                    <div className='d-flex gap-3 mb-2  border-0 rounded-3'>

                        <ImageWithFallback
                            className="rounded-circle border d-none d-md-block" 
                            src={currentItem?.image || '#'}
                            fallbackSrc={userDefault}
                            width={55} 
                            height={55}
                        />


                        <div className="flex-fill my-1">
                            <p className='fw-semibold m-0'>
                                {currentItem?.username || 'Username'}
                            </p>
                            <span className='small text-secondary me-2'>
                                # {currentItem?.id}
                            </span>
                            <span className='small text-lowercase'>
                                <StatusPill status={currentItem?.meta?.status} />
                            </span>
                        </div>

                    </div>

                    {crudMode == CRUD.CREATE &&
                        <FormCreateBan 
                            register={register}
                            setValue={setValue} 
                            crudHook={crudHook}
                        />}

                    {crudMode !== CRUD.CREATE && 
                        <FormBanInfo {...currentItem?.meta} />
                    }

                    <div className='w-100 d-flex justify-content-center gap-3'>
                        {crudMode == CRUD.CREATE && (
                            <Button 
                                onClick={async () => await handleAction(handleSubmit)} 
                                variant="primary" className="btn-sm my-2" >
                                <i className="bi bi-check"></i> Confirm
                            </Button>
                        )}
                        {crudMode !== CRUD.CREATE && (
                            <Button variant="danger" 
                                onClick={async () => await handleAction(handleUnbanUser)} 
                                className="my-2 btn-sm" >
                                <i className="bi bi-unlock"></i>  Unban
                            </Button>
                        )}

                        <Button variant="dark" 
                            onClick={close} 
                            className="my-2 btn-sm" >
                            <i className="bi bi-x-lg"></i> Cancel
                        </Button>
                        
                    </div>

                </>
            </FetchState>
        </div>)
}

export default BanUser;
