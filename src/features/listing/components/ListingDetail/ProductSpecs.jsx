import React, { useContext, useState } from "react";
import { Table, Button, Form, InputGroup } from "react-bootstrap";



function ProductSpecs({ producto, children }) {


  return (
    <>
      {children}

      <div className="d-flex gap-3 my-2 flex-wrap flex-sm-nowrap">

        <div className="w-100">
          <p className="fw-medium small mb-2">Caracteristicas principales</p>
          <Table style={{ overflowX: 'hidden' }} className="small rounded m-0" striped hover>
        <tbody className="rounded">
          <tr className="small border-0">
            <td className="fw-medium border-0">Brand</td>
            <td style={{background: 'var(--bs-table-bg-type)'}} 
              className="border-0 w-100">
              {producto.brand || ''}
            </td>
          </tr>


          <tr className="border-0 small" >
            <td className="fw-medium border-0">Weight</td>
            <td  className="border-0"> 
              {producto.weight  || '0'} kg 
            </td>
          </tr>
          <tr className="border-0 small">
            <td className="fw-medium border-0">Warranty</td>
            <td style={{background: 'var(--bs-table-bg-type)'}} 
              className="border-0"> 
              {producto.warrantyInformation || ''} 
            </td>
          </tr>

        </tbody>
          </Table>
        </div>
        
        <div className="w-100">
          <p className="fw-medium small mb-2">Dimensiones</p>
          <Table style={{ overflowX: 'auto' }} className="small rounded m-0" striped hover>
        <tbody className="rounded">

          <tr className="border-0 small">
            <td className="fw-medium border-0">Width</td>
            <td style={{background: 'var(--bs-table-bg-type)'}} className="border-0 w-100">
              {producto.dimensions?.width || '0'} cm 
            </td>
          </tr>
          <tr className="border-0 small">
            <td className="fw-medium border-0">Height</td>
            <td className="border-0">
              {producto.dimensions?.height || '0'} cm  
            </td>
          </tr>

          <tr className="border-0 small">
            <td className="fw-medium border-0">Depth</td>
            <td style={{background: 'var(--bs-table-bg-type)'}} className="border-0">
              {producto.dimensions?.depth || '0'} cm 
            </td>
          </tr>

        </tbody>
          </Table>
        </div>

      </div>
    </>
    
  );
}

export default ProductSpecs;