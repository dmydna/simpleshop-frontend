import CopyButton from '@/components/common/CopyButton';
import SortByParam from '@/components/common/SortButton';
import StatusPill from '@/components/common/StatusPill';
import { useListManagerSync } from '@/features/form/hooks/useListManagerSync';
import Pagination from '@/features/pagination/components/Pagination.jsx';
import { useUrlState } from '@/hooks/useUrlState';
import { Status } from '@/utils/defines';
import DataView from '@common/DataView';
import { pillColor } from "@utils/enums";
import { placeholderURL } from '@utils/image';
import { formatDate } from "@utils/mappers";
import React from 'react';
import { Button, Form, Table } from 'react-bootstrap';


const ListingTable = ({ baseHook, className, }) => {


    // eslint-disable-next-line no-unused-vars
    const { content, loading, totalPages, error, refreshData, ...props } = baseHook;

    const { setSearchParams } = useUrlState()

    const { idParam } = useListManagerSync({ baseHook: baseHook })

    const toggleSelect = (item) => {
        // console.log(setSearchParams)
        setSearchParams(prev => ({
            ...prev, id: idParam != item?.id ? item?.id : null
        }))
    }

    const openDialogActions = (item) => {
        setSearchParams(prev => ({ ...prev, dialog: 'action', id: item?.id }))
    }


    return (
        <DataView
            loading={loading}
            error={error}
            data={content}
            onRetry={ refreshData }
            emptyIcon={"bi bi-sticky"}
            emptyMessage={"No hay items"}
            listFix={true}
        >
            <>
                <div className={`${className} small w-100`}>

                    <Table style={{ overflowX: 'auto' }} className="mb-0 w-100" striped={false} bordered={false} hover={true}>
                        <thead className=''>
                            <tr className='border-bottom'>
                                <th style={{ width: '150px' }} className='d-none  d-md-table-cell text-secondary'>
                                    <i class="bi bi-grip-vertical"></i>
                                </th>
                                <th style={{ width: '150px' }} className='text-secondary'>
                                   <SortByParam>Title</SortByParam>
                                </th>
                                <th style={{ width: '150px' }} className='text-secondary'>Hash</th>
                                <th style={{ width: '150px' }} className='text-secondary'>
                                    <SortByParam name='createdAt' >Created at</SortByParam>
                                </th>
                                <th style={{ width: '150px' }} className='text-secondary'>
                                    <SortByParam>Status</SortByParam>
                                </th>
                                <th style={{ width: '150px' }} className='text-secondary'>
                                    <SortByParam>Price</SortByParam>
                                </th>
                                <th style={{ width: '150px' }} className='text-secondary'>
                                    <SortByParam name='availabilityStatus'>Availability</SortByParam>
                                </th>
                                <th style={{ width: '150px' }} className='d-block d-table-cell d-md-none text-secondary'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {content?.map((item) => (

                                <tr className={`onhover ${item.id === idParam ? 'selected' : ''}`}
                                    style={{ overflow: "visible", height: "70px" }} key={item.id}>

                                    {/* Input check item */}
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

                                    {/* Thumbnail & Title */}
                                    <td>
                                        <img
                                            style={{ objectFit: 'contain', width: '60px', height: '60px' }} // Altura fija igual al texto
                                            className="bg-white border border-1 rounded flex-shrink-0"
                                            src={item?.thumbnail || placeholderURL.listing(item?.id)}
                                        />
                                        <span className='mx-3 fw-medium'>{item?.title}</span>
                                    </td>
                                    
                                    {/* Id */}
                                    <td className='text-secondary'>
                                        <div style={{ lineHeight: '4.2' }} className='btn btn-sm p-0'>
                                            <CopyButton value={item?.id} />
                                        </div>
                                    </td>

                                    {/* Created At */}
                                    <td className='text-secondary' style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <i className='bi bi-calendar me-2'></i>
                                        {item?.meta?.createdAt ? formatDate(item?.meta?.createdAt) : '-.-'}
                                    </td>

                                    {/* Status */}
                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <StatusPill status={item?.meta?.status} />
                                    </td>
                                    
                                    {/* Price */}
                                    <td className='fw-medium' style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <i className='bi bi-currency-dollar'></i>
                                        {item?.price || 0}
                                    </td>

                                    {/* Availability */}
                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }} >
                                        
                                        <StatusPill status={item?.availabilityStatus} />

                                    </td>


                                    {/**Action */}
                                    <td className='small d-table-cell d-md-none'
                                        style={{ lineHeight: '4.2', textAlign: 'end' }}  >
                                        <Button
                                            size="sm"
                                            variant="border-0 ligth"
                                            onClick={() => openDialogActions(item)}
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


export default React.memo(ListingTable);
