import InputSelectParam from "@features/filters/components/InputSelectParam"
import BadgeParams from "@features/filters/components/BadgeParams"
import { useSearchParams } from "react-router-dom";
import { Button } from 'react-bootstrap';


export default function FilterBarParams({ children, close, badgeParams = false }) {
	
	const [searchParams, setSearchParams] = useSearchParams();
	const allParams = searchParams.toString();
	const clearParams = () => setSearchParams(new URLSearchParams());

	return (
		<div className="">

			<div className='d-flex flex-wrap gap-3 mt-3 mt-md-0'>

				{children}

			<div className='col-12 col-md-4 text-end'>
				<div
					onClick={clearParams}
					style={{ lineHeight: '25px', height: '37px' }} 
					className="btn btn-dark btn-sm  border rounded-3 w-100 text-uppercase" >
					<i className='m-2 bi bi-x-circle '> </i>
					<span>clear filters</span>
				</div>
			</div>

			</div>
			<div className={`my-3 ${!allParams ? '' : 'border-top'}`}>
				<BadgeParams blacklist={['filter', 'page', 'dialog', 'query', 'tableVersion']} />
			</div>


		</div>                
	)
}
