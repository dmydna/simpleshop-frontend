export default function Header({title, subtitle, className}){
	

	return(
        <div className={`${className || 'mb-5 border-bottom'}`}>
            <p className="h5 mb-1">{title || ''}</p>
            <p  style={{ opacity: '.5' }} className="small muted">
                {subtitle || ''}
            </p>
        </div>
	)
}