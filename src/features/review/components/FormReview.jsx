import FetchState from "@/components/common/FetchState";
import { IconTint } from "@/components/common/FloatButtonCollection";
import PlaceholderIcon from "@/components/common/PlaceholderIcon";
import { useReview } from "@/features/review/hooks/useReview";
import { useForm } from "@/hooks/useForm.js";
import StarRating from "@common/StarRating.jsx";
import { ProfileHeader } from "@f/profile/components/ProfileHeader";
import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";



function FormReview({className, close}) {

    const [rating, setRating] = useState(2);
    const [searchParams] = useSearchParams();
    const pendingId = searchParams.get('id');

    const { updateReview, loading, setError, error, success, setSuccess,
    setId, currentItem } = useReview({autofetch:false})
    const { setFormData, formData, onChange } = useForm()


    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        updateReview(pendingId, {
            id: pendingId,
            status: "ACTIVE",
            comment: formData?.comment,
            rating: formData?.rating
        })

    }

    useEffect(()=>{
        if(pendingId){
            setId(pendingId)
        }
        if(currentItem){
           setFormData( prev => ({ ...prev, status: "ACTIVE"}) )
        }
        if(rating){
            setFormData( prev => ({ ...prev, rating: rating }) )
        }
    },[pendingId, currentItem, rating])



    return (
        <FetchState.Modal
            version={true}
            hook={{loading, error, setError, success, setSuccess}}
        >
                <div className={className} >

                    <div className="position-relative">
                        <ProfileHeader
                            className='my-2'
                            title="Califica tu producto"
                        />
                        {close && (
                            <IconTint
                                style={{marginTop: '-10px'}}
                                className={'position-absolute top-0 right-0 rounded-circle'}
                                action={close}
                                icon={'x-lg'}
                            />
                        )}
                    </div>
                    <Form id='reviewForm' style={{ minHeight: '190px' }} onSubmit={handleSubmit}>


                        <Form.Group className="mb-3 w-100">


                            <div className='d-flex gap-3 mb-3  border-0 rounded-3 p-2 w-100'>
{/*                                <img style={{ height: '55px', width: '55px' }} className='rounded' src={currentItem?.image || placeholder({ dimension: "45x45", background: ".menta", fontSize: "20", icon: "f244" })} />*/}
                                <div className="d-none d-md-block">
                                    <PlaceholderIcon fontSize='fs-4' variant={'success flex-glow'} icon={'bi-cart3'} />
                                </div>
                                <div className="flex-fill">
                                    <p onClick={()=> navigate(`/p/${currentItem?.id}`)}
                                       className='small fw-semibold m-0 pointer mb-3 mb-md-0'>
                                       {currentItem?.title}
                                    </p>
                                    <div className='d-flex justify-content-between align-items-md-center flex-column flex-md-row '>
                                        <p className='m-0'>Calificación: {rating} estrellas</p>
                                        <StarRating value={rating} onChange={setRating} />
                                    </div>

                                </div>
                            </div>

                            <div className='d-none d-flex justify-content-between align-items-center'>
                                <p className='m-0'>Calificación: {rating} estrellas</p>
                                <StarRating value={rating} onChange={setRating} />
                            </div>

                        </Form.Group>
                        <Form.Group className="mb-4 w-100">
                            <FloatingLabel
                                controlId="floatingComment"
                                label="Comentario"
                                className="mb-3"
                            >
                                <Form.Control
                                    style={{ minHeight: '100px', resize: 'vertical' }}
                                    as={"textarea"}
                                    rows={8}
                                    name="comment"
                                    placeholder="Ingresa tu comentario"
                                    value={formData?.comment || ''}
                                    onChange={onChange}


                                />
                            </FloatingLabel>
                        </Form.Group>


                    </Form>
                    <div className='w-100 d-flex justify-content-center'>
                        <Button form='reviewForm' variant="primary" type="submit" className="my-2" >
                            Enviar
                        </Button>
                    </div>
                </div>
        </FetchState.Modal>
    )
}

export default FormReview;
