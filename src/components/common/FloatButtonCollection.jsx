import { useMemo, useState } from "react";

/**
 * Muestra el ícono con fill solo cuando se hace hover.
 */
export function HoverIcon({action, children, icon, className, disabled}){
	
	const [isHovered, setIsHovered] = useState(false);
	const iconClass = isHovered ? `bi-${icon}-fill` : `bi-${icon}`

	return (
	    <span 
          onClick={action} 
	    	  onMouseEnter={()=>setIsHovered(true)} 
	    	  onMouseLeave={()=>setIsHovered(false)} 
            style={{lineHeight:'0px', padding: '10px'}}
            className={`btn ${className || ''} z-index-10 ${disabled? 'disabled': ''}`}>
            <i className={iconClass}></i> 
            {children}
        </span>
     )
}


/**
 * Muestra el ícono con fill basado en el estado (status).
 * Si está activo (status=true), siempre se ve 'fill'.
 * Si está inactivo, muestra 'fill' solo al hacer hover.
 */
export function ToggleIcon({action, children, icon, status, className, disabled = false}){
  
  const [isHovered, setIsHovered] = useState(false);

  const iconClass =  useMemo(()=>{
     // console.log("status", status)
     if(status) return `bi-${icon}-fill`
     if(isHovered) return `bi-${icon}-fill`
     return `bi-${icon}`
  },[isHovered, status, icon])

  return (
     // desactiva hover effect si el status es true.
      <span onClick={action} 
          onMouseEnter={()=>{
            if(!status) setIsHovered(true)
          }} 
          onMouseLeave={()=>{
            if(!status) setIsHovered(false)
          }} 
            style={{lineHeight:'0px', padding: '10px'}}
            className={`btn ${className || ''} z-index-10 ${disabled? 'disabled': ''}`}>
            <i className={iconClass}></i> 
            {children}
        </span>
     )
}



/**
 * Muestra el ícono con effecto sombreado al hacer hover.
 */
export function IconTint({ action, children, icon, className, style }) {
  const [isHovered, setIsHovered] = useState(false);
  const iconClass = `bi-${icon}`
  return (
    <span
      onClick={action}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        lineHeight: '0px',
        padding: '10px',
        position: 'relative', // Necesario para posicionar el overlay
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '.5',
        ...style
      }}
      className={`btn ${className || ''}`}
    >
      {/* Overlay oscuro al hacer hover */}
      {isHovered && (
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transition: '.5',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color oscuro levemente
            borderRadius: 'inherit', // Si el botón tiene border-radius
            pointerEvents: 'none', // Permite que el clic llegue al span padre
            zIndex: 1
          }}
        />
      )}

      {/* El icono con la clase dinámica */}
      <i className={iconClass} style={{ zIndex: 2, position: 'relative' }}></i>
      
      {/* Contenido secundario (texto, etc.) */}
      {children && <span style={{ zIndex: 2, position: 'relative', marginLeft: '8px' }}>{children}</span>}
    </span>
  );
}


/**
 * Muestra un elemento hijo con effecto sombreado tinta al hacer hover.
 */
export function Tintify({ action, children, className, style }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span
      onClick={action}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        lineHeight: '0px',
        padding: '10px',
        position: 'relative', // Necesario para posicionar el overlay
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '.5s',
        ...style
      }}
      className={`btn ${className || ''}`}
    >
      {/* Overlay oscuro al hacer hover */}
      {isHovered && (
        <span
          style={{
            position: 'absolute',
            transition: '.5s',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color oscuro levemente
            borderRadius: 'inherit', // Si el botón tiene border-radius
            pointerEvents: 'none', // Permite que el clic llegue al span padre
            zIndex: 1
          }}
        />
      )}

      {/* Contenido secundario (texto, etc.) */}
      {children && <span style={{ zIndex: 2, position: 'relative' }}>{children}</span>}
    </span>
  );
}
