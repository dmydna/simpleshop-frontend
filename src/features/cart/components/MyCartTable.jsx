import CartInput from '@/features/cart/components/CartInput';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default function MyCartTable({ className, content }) {

    return (
        <>
            <div className={`${className} small w-100`}>

                <Table style={{ overflowX: 'auto' }} className="mb-0 w-100" striped={false} bordered={false} hover={true}>
                    <thead className=''>
                        <tr style={{height:'0px', visibility:'collapse'}}>
                            
                            <th style={{ width: '70px' }} className='text-secondary'>IMAGE</th>
                            <th style={{ width: '500px' }} className='text-secondary'>TITLE</th>
                            <th style={{ width: '150px' }} className='text-secondary'>DETAILS</th>
                            <th style={{ width: '150px' }} className='text-secondary'>PRICE</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {content?.map((item) => (

                            <tr className={`onhover`}
                                style={{ border: 'transparent', overflow: "visible", height: "70px" }} key={item.id}>
                                
                                {/* IMAGE */}
                                <td>
                                     <img
                                        style={{ objectFit: 'contain', width: '60px', height: '60px' }} // Altura fija igual al texto
                                        className="bg-white border border-1 rounded flex-shrink-0"
                                        src={item?.thumbnail}
                                    />
                                </td>

                                {/* TITLE */}
                                <td>
                                    <span className='fw-medium'>
                                        <Link className='text-decoration-none text-dark' to={`/p/${item.id}`}>{item?.title}</Link>
                                    </span>
                                    <CartInput style={{width: '150px'}} producto={item}/>
                                </td>

                                {/* DESCRIPTION */}
                                <td className='text-secondary' style={{ lineHeight: '5.4', textAlign: 'start' }}  >
                                    
                                    {item?.cantidad} x $ {(item?.finalPrice || 0).toFixed(2)} 
                                    {item?.discountPercentage && ` (${item.discountPercentage}%OFF)`}
                                </td>

                                {/* PRICE */}
                                <td className='bg-light fw-medium d-table-cell'
                                    style={{zIndex:2, lineHeight: '5.4', textAlign: 'end' }}  > 
                                    <i className='bi bi-currency-dollar'></i>
                                    {(item?.finalPrice*item?.cantidad).toFixed(2) || 0}
                                </td>
                                
                            </tr>
                        )
                        )}
                    </tbody>
                </Table>


            </div>


        </>
    );
}

