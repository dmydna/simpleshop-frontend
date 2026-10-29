import { Button } from "react-bootstrap";
import { IconTintyColor } from "@/components/common/IconTintyColor";
import FallbackError from "@/features/fallback/components/FallbackError";



// WIP: FallbackModal.jsx

export const Title = ({children}) => {
    return (
        <p className='fw-bold mb-0'>{children}</p>
    )
}

export const Text = ({children}) => {
    return(    
    <p className='text-secondary m-0 small'>
        {children}
    </p>)
}

export const Button = ({variant, handle, children})=>{
    return(
        <Button className='btn-sm rounded-3 border' variant="light" onClick={handle}>
            {children}
        </Button>
    )
}

export function FallbackModal({ icon, text ,title, headerTitle }) {


    return (
  
        <div className="text-center my-3">

            <div className='d-flex justify-content-end'>
                <span className='fs-5 fw-semibold visually-hidden'>
                    {headerTitle}
                </span>
            </div>

            <div className='d-block'>

                <IconTintyColor ico={icon} size={80} fs={1} />

                <p className='fw-bold mb-0'>{title}</p>
                <div className="my-3">
                    {textNodes}
                </div>
            </div>

            <div className='d-flex gap-3 justify-content-center my-2'>
                {actionNodes}
            </div>

        </div>
    );
}


export default FallbackModal;
FallbackError.Button = Button;
FallbackModal.Text = Text;