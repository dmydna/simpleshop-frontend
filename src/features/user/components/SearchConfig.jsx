import SelectParams from "@/features/filters/components/SelectParams";
import { useUrlState } from "@/hooks/useUrlState";
import { Button } from "react-bootstrap";

export default function SearchConfig({children, close, className}) {

  const { setSearchParams } = useUrlState();

  const clearParams = () => {
    setSearchParams(prev => {
      return { ...prev, type: null };
    })
  }

  return (
    <div className={className}>

			<div className="d-flex justify-content-between mb-4">
				<p style={{ lineHeight: '1.25rem' }}
					className="small mb-0 fw-medium p-1">
				 Search config
				</p>
				<div className='d-flex gap-3'>
					{close && (
						<Button style={{ lineHeight: '1.25rem' }} onClick={close} variant="light" className="p-1">
							<i className="bi-x-lg "></i>
						</Button>
					)}
				</div>
			</div>


			{children}

			<div className='d-flex justify-content-center gap-4 mt-4'>
				<span onClick={()=>{clearParams(); close()}}
					className="btn btn-sm border rounded-3 fw-lighter">
					<i className='bi bi-x me-2'> </i>cancelar
				</span>
				<span onClick={close}
					className="btn btn-sm btn-dark border rounded-3" >
					<i className='bi bi-check me-2'> </i>aceptar
				</span>
			</div>

		</div>
  )
}
