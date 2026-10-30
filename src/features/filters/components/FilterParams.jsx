import InputSelectParam from "@features/filters/components/InputSelectParam"
import BadgeParams from "@features/filters/components/BadgeParams"
import { useSearchParams } from "react-router-dom";
import { Button } from 'react-bootstrap';


function FilterParams({children, close, badgeParams = false, className}){
	
	const [searchParams, setSearchParams] = useSearchParams();
	const allParams = searchParams.toString();
	const clearParams = () => setSearchParams(new URLSearchParams() ) ;

	
	return (
		<div className={className}>

			<div className="d-flex justify-content-between mb-4">
				<p style={{ lineHeight: '1.25rem' }} 
					className="small mb-0 fw-medium p-1">
					Filter by
				</p>
				<div className='d-flex gap-3'>
					{!close && (
					<span style={{padding: '2px 5px', height: '30px', lineHeight: '1.25rem'}} 
						  className="btn btn-light small text-primary fw-lighter p-1" onClick={clearParams}>
						clear
					</span>
				    )}
					{close && (
						<Button style={{ lineHeight: '1.25rem' }} onClick={close} variant="light" className="p-1">
							<i className="bi-x-lg "></i>
						</Button>
					)}
				</div>	
			</div>


			{children}


			<div className={`my-3 ${!allParams ? '': 'border-top'}`}>
				<BadgeParams blacklist = {['page', 'dialog', 'query','tableVersion']} />
			</div>
			
			{close && (
				<div className='d-flex justify-content-center gap-3'>
					<span onClick={clearParams}
						className="btn btn-sm  border rounded-3" >
						<i className='bi bi-trash3 me-2'> </i>clear filters
					</span>
					<span onClick={close}
						className="btn btn-sm btn-dark  border rounded-3 fw-lighter">
						<i className='bi bi-check me-2'> </i>apply filters
					</span>
				</div>
			)}

		</div>                
		)
}



export default FilterParams;