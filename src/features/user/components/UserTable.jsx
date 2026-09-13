import PlaceholderIcon from '@/components/common/PlaceholderIcon';
import SortByParam from '@/components/common/SortButton';
import { useListManagerSync } from '@/features/form/hooks/useListManagerSync';
import Pagination from '@/features/pagination/components/Pagination.jsx';
import { useUrlState } from '@/hooks/useUrlState';
import DataView from '@common/DataView';
import { pillColor } from '@utils/enums';
import React from 'react';
import { Button, Form, Table } from 'react-bootstrap';

// TODO: resolver filtro crud de usuarios 
const UserTable = ({  baseHook, className }) => {

    const { content, loading,  totalPages, ...props } = baseHook

    const { setSearchParams } = useUrlState()
    const { idParam } = useListManagerSync({ baseHook: baseHook })

    const toggleSelect = (item) => {
        setSearchParams(prev => ({...prev, 
            id: idParam != item?.id ? item?.id : null  
        }))
    }

    const openDialogActions = (item)=>{
        setSearchParams(prev => ({ ...prev, dialog: 'action', id: item?.id  })) 
    }

    return (
        <DataView 
            loading={loading}
            data={content}
            emptyIcon={"bi bi-person"}
            emptyMessage={"No hay items"}
            listFix={true}
        >
        <>
            <div className={`${className} small w-100`}>
                

                <Table style={{ overflowX: 'auto' }} className="mb-0 w-100" striped={false} bordered={false} hover={true}>
                    <thead className=''>

                            <tr className='border-bottom'>
                                {/* Selection */}
                                <th style={{ width: '50px' }} className='d-none  d-md-table-cell text-secondary'>
                                    <i class="bi bi-grip-vertical"></i>
                                </th>
                                {/* Item */}
                                <th style={{ width: '250px' }}  className='text-secondary'>
                                    <SortByParam name="username"> Username </SortByParam>
                                </th>
                                <th style={{ width: '200px' }} className='text-secondary'>Role</th>
                                <th style={{ width: '200px' }} className='text-secondary'>Email</th>
                                <th style={{ width: '200px' }} className='text-secondary'>Status</th>
                                {/* Action */}
                                <th style={{ width: '50px' }} className='d-block d-table-cell d-md-none text-secondary'></th>
                            </tr>

                    </thead>
                    <tbody>
                        { content?.map((item) => (


                                <tr className={`onhover ${item?.id === idParam ? 'selected' : ''}`}
                                    style={{ overflow: "visible", height: "70px" }} key={item.id}>

                                    {/* Selection */}


                                    <td
                                        onClick={() => toggleSelect(item)}
                                        className='text-secondary d-none  d-md-table-cell'>
                                        <Form.Check // prettier-ignore
                                            type='checkbox'
                                            id={`default-radio`}
                                            className='mt-3'
                                            checked={idParam == item.id}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggleSelect(item);
                                            }}
                                        />
                                    </td>

                                    {/* Item */}

                                    {item?.username && (
                                        <td>

                                            {/*<img
                                                style={{ objectFit: 'contain', width: '60px', height: '60px' }} // Altura fija igual al texto
                                                className="border border-1 rounded flex-shrink-0"
                                                src={item?.image || placeholderURL.user(item?.id) }
                                            />*/}
                                            {item?.image ? 
                                            <>
                                                <img
                                                    style={{ objectFit: 'contain', width: '40px', height: '40px' }} // Altura fija igual al texto
                                                    className="border border-1 rounded flex-shrink-0 my-2"
                                                    src={item?.image}
                                                /> 
                                                <span className='flex-grow-1 mx-3 fw-medium'>{item?.username}</span>
                                            </>
                                            :
                                            <div className='d-flex align-items-center my-2'>
                                                <PlaceholderIcon fontSize='fs-5' variant={'danger'} icon={'bi-person'} />
                                                <span className='flex-grow-1 mx-3 fw-medium'>{item?.username}</span>
                                            </div>
                                            
                                            }

                            
                                        </td>
                                    )}



                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <span
                                            className={`text-lowercase fw-medium ${pillColor[item?.role]}`}>
                                            {item?.role || '-.-'}
                                        </span>
                                    </td>

                                    <td className='fw-medium' style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <i className='bi bi-email'></i>
                                        {item?.email}
                                    </td>


                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }} >
                                        <span 
                                           className={`text-lowercase ${pillColor[item?.meta?.status]}`} >
                                            {item?.meta?.status || '-.-'}
                                        </span>
                                    </td>

                                        {/**Action */}
                                        <td className='small d-table-cell d-md-none'
                                            style={{ lineHeight: '4.2', textAlign: 'end' }}  >
                                            <Button
                                                variant="border-0 ligth"
                                                size="sm"
                                                onClick={ () => openDialogActions(item) }
                                            >
                                                <i className="bi bi-three-dots h5"></i>
                                            </Button>

                                        </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>


            </div>

            <Pagination
                className="mb-0"
                totalPages={totalPages}
            />

        </>
     </DataView>   
    );
}


export default React.memo(UserTable);

