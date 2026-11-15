import { useRef, useState } from 'react';
import CircleButton from '@common/CircleButton'

function ImageUploader({ image, setImage, setPreview, preview }) {

  //const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateImage = (file) => {
    if (!file || !(file instanceof File)) {
      console.error("El objeto recibido no es un archivo válido:", file);
      setError('El archivo seleccionado no es válido.');
      return false;
    }

    const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Solo se permiten archivos SVG, PNG, JPG o GIF');
      return false;
    }

    if (file.size > 1024 * 1024) {
      setError('La imagen no debe superar 1MB');
      return false;
    }

    return true;
  };

  const handleFileSelect = (file) => {
    setError('');
    if (!validateImage(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(file);
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      // Extraer el primer archivo de la lista
      handleFileSelect(fileList[fileList.length - 1]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el drop
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;

    // CORRECCIÓN: Extraer el archivo de la FileList
    if (files && files.length > 0) {
      handleFileSelect(files[files.length - 1]);
    } else {
      setError('No se detectó ningún archivo al soltar.');
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreview('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="upload-container mb-4">
      <div className="bg-light p-5 border-3 border border-dashed rounded-4 upload-img" style={{ position: 'relative' }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept="image/svg+xml,image/png,image/jpeg,image/gif"
          style={{ display: 'none' }}
        />

        {preview ? (
          <div style={{ zIndex: 20, position: 'relative' }} className="d-block mx-auto text-center">
            <div className="d-flex justify-content-center">
            <img className="border rounded-4 mx-2"
              src={preview}
              alt="Vista previa"
              style={{ width: '170px', height: '170px', objectFit: 'contain' }}
            />
            <div className="flex-column">
                <CircleButton 
                   className="mb-1 shadow-xs bg-white" 
                   onClick={handleRemove}
                 >
                  <i className="bi bi-x-lg text-danger" />
                </CircleButton>  
                <CircleButton  
                  className="shadow-sm bg-white"
                  onClick={handleClick}
                >
                  <i className="bi bi-pencil" />
                </CircleButton> 
            </div>
            </div>
            <div className="mt-3 d-none">
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={handleClick}>
                Cambiar imagen
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={handleRemove}>
                Eliminar
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <i style={{
              width: "50px",
              height: "50px",
              padding: "3px 10px",
              display: "inline-table"
            }} className="bi bi-upload fs-4 rounded-circle border-3 border-dotted border-primary  text-primary mb-2"></i>
            <p className='mb-0'>Click to <b>upload</b> or drag and drop</p>
            <small className="text-muted">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </small>
            {/*{error && <p className="text-danger mt-2">{error}</p>}*/}
          </div>
        )}

        {/* CORRECCIÓN: Eliminado pointerEvents: 'none' para permitir que los eventos lleguen aquí */}
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            // pointerEvents: 'none'  <-- ESTO ESTABA ROMPIENDO EL DROP
          }}
        />
      </div>
      {error && <div className="alert alert-danger mt-3 py-2 small">{error}</div>}
    </div>
  );
}

export default ImageUploader;
