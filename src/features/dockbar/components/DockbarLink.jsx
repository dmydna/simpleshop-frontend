import { Tintify } from "@/components/common/FloatButtonCollection";
import { Link } from "react-router-dom";


const variantClasses = {
  'outline-dark': { bg: 'bg-white', color: 'text-dark' },
  'outline-primary': { bg: 'bg-light', color: 'text-primary' },
  'primary': { bg: 'bg-primary', color: 'text-white' },
  'secondary': { bg: 'bg-secondary', color: 'text-white' },
  'success': { bg: 'bg-success', color: 'text-white' },
  'danger': { bg: 'bg-danger', color: 'text-white' },
  'warning': { bg: 'bg-warning', color: 'text-dark' }, // El texto suele ser oscuro en fondos amarillos
  'info': { bg: 'bg-info', color: 'text-white' },
  'light': { bg: 'bg-light', color: 'text-dark' },
  'dark': { bg: 'bg-dark', color: 'text-white' },
};





export default function DockbarLink({ label, icon, to, className, style, variant = 'outline-dark', fs ,onclick }) {
  // Obtenemos las clases por defecto o usamos un fallback seguro
  const classes = variantClasses[variant] || variantClasses['outline-dark'];

  return (
    <li
      onClick={onclick}
      style={style} className={`list-group-item border-0 p-0 ${classes.bg} ${className || ''}`}
    >
      <Link className="text-center text-normalize px-2 d-flex flex-column" to={to}>

        <Tintify className="rounded-circle">
          <i className={`bi ${icon} fs-4 ${classes.color}`} ></i>
        </Tintify>  
        <span 
          className={`${classes.color}`} 
          style={{ fontSize: fs || '.7rem' }}
        >
          {label || ""}
        </span>
      </Link>
    </li>
  );
}