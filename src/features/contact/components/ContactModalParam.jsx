import ModalParam from "@/components/common/ModalParam";
import ContactForm from "@/features/contact/components/ContactForm";


export default function ContactModalParam() {
    return (

        <ModalParam size="md" param="dialog=contact">
            {(close) =>
                <ContactForm className={'bg-light rounded p-5'} style={{ maxWidth: 500 }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 m-0">Contacto</h1>
                        <i onClick={() => close()} className="h3 bi bi-x m-0 fade-hover"></i>
                    </div>
                </ContactForm>
            }
        </ModalParam>
    )
}