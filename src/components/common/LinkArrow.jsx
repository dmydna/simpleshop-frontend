import React from "react"
import { Link } from "react-router-dom"


function LinkArrow({children, style, to}){


    return(
        <Link style={style} to={to} className="text-white text-decoration-none d-flex align-items-center hover-underline"
        >
          {children}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none" className="ms-2"
          >
            <path
              d="M4.89803 1.85226L4.10254 2.64776L7.45479 6.00001L4.10254 9.35226L4.89803 10.1478L9.04578 6.00001L4.89803 1.85226Z"
              fill="currentColor"
            />
          </svg>
        </Link>
    )
}

export default LinkArrow