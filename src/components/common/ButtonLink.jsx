
function ButtonLink({ handle, icon,children, className, visible=true, role, disabled=false, arrow=false }) {

    const safeHandle = typeof handle === 'function' ? handle : () => {};

    return (
        <>
            {visible && (
                <div onClick={safeHandle}
                    className={`${disabled? 'disabled': ''} btn bg-hover border-0 py-2 mb-2 text-start w-100 d-flex justify-content-between ${className}`}>
                        <div className="fw-medium">
                            <i className={`bi ${icon} me-3`}></i>
                            <span className="small">{children}</span>
                        </div>
                        {arrow && <i className="bi-chevron-right"></i>}
                </div>  
            )}
        </>
    )
}

export default ButtonLink
