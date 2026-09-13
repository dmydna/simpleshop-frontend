import CopyButton from '@/components/common/CopyButton';
import SortByParam from '@/components/common/SortButton';
import { useListManagerSync } from '@/features/form/hooks/useListManagerSync';
import { useUrlState } from '@/hooks/useUrlState';
import DataView from '@common/DataView';
import PlaceholderIcon from "@common/PlaceholderIcon";
import Pagination from '@features/pagination/components/Pagination.jsx';
import { pillColor } from "@utils/enums";
import { formatDate } from "@utils/mappers";
import React from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProductTable({ children, baseHook, className }) {

    const { content, loading, currentPage, setCurrentPage, totalPages, setFilters } = baseHook;

    const { setSearchParams } = useUrlState()
    const navigate = useNavigate()
    const { idParam } = useListManagerSync({ baseHook: baseHook })

    const toggleSelect = (item) => {
        setSearchParams(prev => ({
            ...prev, id:
                idParam != item?.id ? item?.id : null
        }))
    }

    const openDialogActions = (item) => {
        setSearchParams(prev => ({ ...prev, dialog: 'action',  id: item.id }))
    }

    return (
        <DataView
            loading={loading}
            data={content}
            emptyIcon={"bi bi-box-seam"}
            emptyMessage={"No hay items"}
            listFix={true}
        >
            <>
                <div className={`${className} small w-100`}>

                    <Table style={{ overflowX: 'auto' }} className="mb-0 w-100" striped={false} bordered={false} hover={true}>
                        <thead className=''>
                            <tr className='border-bottom'>
                                {/**Selection */}
                                <th style={{ width: '150px' }} className='d-none  d-md-table-cell text-secondary'>
                                    <i class="bi bi-grip-vertical"></i>
                                </th>
                                {/**Item */}
                                <th className='text-secondary'>
                                    <SortByParam name="name"> Name </SortByParam>
                                </th>
                                <th style={{ width: '200px' }} className='text-secondary'>Sku</th>
                                <th style={{ width: '150px' }} className='text-secondary'>
                                    <SortByParam name="date"> Created at </SortByParam>
                                </th>
                                <th style={{ width: '150px' }} className='text-secondary'>Brand</th>
                                <th style={{ width: '150px' }} className='text-secondary'>Status</th>
                                {/** Action */}
                                <th style={{ width: '150px' }} className='d-block d-table-cell d-md-none text-secondary'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {content?.map((item) => (

                                <tr key={item.id}
                                    className={`onhover ${item?.id === idParam ? 'selected' : ''}`}
                                    style={{ overflow: "visible", height: "70px" }}>
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


                                    {/** Item */}
                                    
                                    <td>
{/*                                        <img
                                            style={{ objectFit: 'contain', width: '60px', height: '60px' }} // Altura fija igual al texto
                                            className="border border-1 rounded flex-shrink-0"
                                            src={placeholderURL.product(item?.id)}
                                        /> */}
                                            <div className='my-2'>
                                                <PlaceholderIcon fontSize='fs-5' variant={'success flex-glow'} icon={'bi-box-seam'} />
                                                <span className='flex-grow-1 mx-3 fw-medium'>{item?.name || ''}</span>
                                            </div>
                                    </td>

                                    {/* Sku */}
                                    <td className='text-secondary'>
                                        <div style={{ lineHeight: '4.2' }} className='btn btn-sm p-0'>
                                            <CopyButton value={item?.sku} />
                                        </div>
                                    </td>

                                    {/* Created At */}
                                    <td className='text-secondary' style={{ lineHeight: '4.2' }}  >
                                        <i className='bi bi-calendar me-2'></i>
                                        {item?.meta.createdAt ? formatDate(item?.meta.createdAt || []) : 'n/a'}
                                    </td>

                                    {/* Brand */}
                                    <td className='text-secondary' style={{ lineHeight: '4.2' }}  >
                                        {item?.brand || '-.-'}
                                    </td>


                                    <td style={{ lineHeight: '4.2', textAlign: 'start' }}  >
                                        <span
                                            className={`text-lowercase ${pillColor[item?.meta?.status]}`}>
                                            {item?.meta?.status}
                                        </span>
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



export default React.memo(ProductTable)