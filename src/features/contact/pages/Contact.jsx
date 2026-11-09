import PageFormLayout from '@/components/layout/PageFormLayout';
import ContactForm from '@/features/contact/components/ContactForm.jsx';


function Contact() {


  return (
      <PageFormLayout>
      <ContactForm className={'bg-white rounded-4 border p-4 p-md-5 mx-auto'} style={{maxWidth: 500}}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 m-0">
            Contacto
          </h1>
        </div>
      </ContactForm>
    </PageFormLayout>
  );
}

export default Contact;
