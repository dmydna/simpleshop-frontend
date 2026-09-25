import { useEffect } from "react";


import FetchState from "@/components/common/FetchState";
import InputCrudFloating from "@/features/form/components/InputCrudFloating";
import { useUserForm } from '@/features/user/hooks/useUserForm';
import CompactDateInput from "@common/CompactDateInput";
import { CRUD } from "@utils/enums";
import { pillColor } from '@utils/enums.js';
import { arrayToDate } from "@utils/mappers.js";
import { Button, Form } from "react-bootstrap";

import userDefault from "/user-default-xs.png";

import ImageWithFallback from "@/components/common/ImageWithFallback";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useUrlState } from "@/hooks/useUrlState";
import 'react-datepicker/dist/react-datepicker.css';


// TODO: refactorizar componente baneo de usuario
// 1. se debe enviar dias de baneo (no fechas)
// 2. fronend calcula y muestra dias de baneo restantes 
function BanUser({ close }) {

    const {create_banMode, update_banMode, idParam} = useUrlParams()
    const {setSearchParams} = useUrlState();

    const crudHook = useUserForm(false);

    const { setCurrentItem, currentItem, setId, handleAction,
          loading, error, crudMode, reset, success, setError, 
          setSuccess, banUser, unbanUser, setCrudMode } = crudHook;


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
            //setEnableEditableField(false);
        }

        if (update_banMode) { setCrudMode(CRUD.READ) }

       //NOTA: al aceptar success se convierte en null (por FetchState)
        if(success == null){
            // Actualizacion de estados:
            setSearchParams(prev => ({...prev, 
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

                    <div style={{ lineHeight: '2.5rem' }}
                        className="d-flex justify-content-between mb-2">
                        <p className="fs-6 mb-0 fw-medium">
                            Ban User
                        </p>
                        {close && (
                            <Button onClick={close} variant="light" className="">
                                <i className="bi-x-lg "></i>
                            </Button>
                        )}

                    </div>

                    <Form id='reviewForm' style={{ minHeight: '190px' }} >
                        <Form.Group className="mb-3 w-100">
                            <div className='d-flex gap-3 mb-3  border-0 rounded-3'>

                                <ImageWithFallback 
                                  className="rounded-circle border d-none d-md-block" 
                                  src={currentItem?.image || '#'}
                                  fallbackSrc={userDefault}
                                  width={55} 
                                  height={55}
                                />


                                <div className="flex-fill my-1">
                                    <p className='small fw-semibold text-uppercase m-0'>{currentItem?.username || 'Username'}</p>
                                    <p className='small text-lowercase'>
                                        <span
                                            className={`text-lowercase ${pillColor[currentItem?.meta?.status]}`} >
                                            {currentItem?.meta?.status || '-.-'}
                                        </span>
                                    </p>
                                </div>
                            </div>


                            <CompactDateInput
                                name="banExpiresAt"
                                label={"Ban expires"}
                                crudHook={crudHook}
                            />


                            <InputCrudFloating
                                name={"banReason"}
                                label={"Motivo del baneo"}
                                as={"textarea"}
                                {...crudHook}
                            />


                        </Form.Group>
                    </Form>

                    <div className='w-100 d-flex justify-content-center gap-3'>
                        {crudMode == CRUD.CREATE && (
                            <Button 
                            onClick={async () => await handleAction(handleSubmit)} 
                             variant="primary" className="btn-sm my-2" >
                                <i className="bi bi-check"></i> Confirmo
                            </Button>
                        )}
                        {crudMode !== CRUD.CREATE && (
                            <Button variant="dark" 
                            onClick={async () => await handleAction(handleUnbanUser)} 
                            className="my-2 btn-sm" >
                                <i className="bi bi-unlock"></i>  Unban
                            </Button>
                        )}
                    </div>

                </>
            </FetchState>
        </div>)
}

export default BanUser;
