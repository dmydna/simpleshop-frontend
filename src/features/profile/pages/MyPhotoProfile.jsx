import FetchState from '@/components/common/FetchState.jsx';
import ImageUploader from "@common/ImageUploader.jsx";
import { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { useProfile } from "@f/profile/contexts/ProfileContext.jsx";
import Header from '@/components/layout/Header';


const MyPhotoProfile = ({ title, className }) => {

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState([]);
  const { updateImage, loading, profile, success, setSuccess, error, setError } = useProfile();

  useEffect(() => {
    setPreview(profile?.image || '')
  }, [profile])


  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedFile = image
    updateImage(selectedFile)
  }

  return (

    <FetchState
      hook={{ loading, error, setError, success, setSuccess }}
    >
      <>
        <Header
          className='mb-0'
          title="Imagen de Cuenta"
          subtitle="Cambiar tu imagen de cuenta"
        />
        <ImageUploader
          preview={preview}
          setPreview={setPreview}
          setImage={setImage}
          image={image}
        />
        {/* Usamos el Button de Bootstrap para mejor estética */}
        {image !== null && (
          <div className='w-100 d-flex justify-content-center'>
            <Button onClick={handleSubmit} variant="outline-dark" disabled={loading}>
              <i className='bi bi-floppy me-2'></i>
              Guardar cambios
            </Button>
          </div>
        )}


      </>
    </FetchState>


  );
};

export default MyPhotoProfile;
