import React, { useState, useMemo, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function FormBanTime({ register, setValue }) {

  const [days, setDays] = useState(1);
  const [time, setTime] = useState(1);
  const [selected, setSelected] = useState('0'); // '0': temporal, '1': permanent

  const arrayRange = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  // 2. Cálculo de la fecha futura de desbaneo
  const calculateFutureDate = useMemo(() => {
    if (selected === '1') return null; // Es permanente

    const totalDays = Number(days) * Number(time);
    const date = new Date();
    date.setDate(date.getDate() + totalDays);
    return date;
  }, [days, time, selected]);

  // 3. Sincronización con el formulario (Setea el valor resultante)
  useEffect(() => {
    if (selected === '1') {
      setValue('isPermanent', true);
      setValue('unbanDate', null);
      setValue('banDays', null);
    } else {
      setValue('isPermanent', false);
      setValue('unbanDate', calculateFutureDate);
      setValue('banDays', Number(days) * Number(time));
    }
  }, [selected, calculateFutureDate, days, time, setValue]);

  const formattedDate = calculateFutureDate
    ? calculateFutureDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : null;

  return (<>
    <>
      {/* User Ban */}

      <div className="mb-4 border p-2 rounded-3">

        <p style={{opacity: '.6'}} className='small text-secondary'>Tiempo de Baneo</p>

        {selected == 0 ?
          <>
            <p className="text-center mb-4 text-danger small fw-semibold
        ">{formattedDate} ({days * time} {days == 1 ? 'day' : 'days'})</p>
          </>
          :
          <p className="text-uppercase mb-4 fw-semibold text-danger text-center
        ">permanently</p>
        }



        <InputGroup>

          <Form.Select
            size='sm'
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="p-2" name="category" >
            <option className='me-2' value={0}>Temporal</option>
            <option value={1}>Permanent</option>
          </Form.Select>


          {selected == 0 &&
            <>
              <Form.Select 
                style={{maxWidth: "60px"}}
                size='sm'
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="p-2" name="category" >
                {arrayRange.map(i => <option key={i} value={i}>{i}</option>)}
              </Form.Select>

              <Form.Select 
                style={{maxWidth: "80px"}}
                size='sm'
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="p-2" name="category" >
                <option value={1}>Day</option>
                <option value={7}>Week</option>
                <option value={30}>Month</option>
              </Form.Select>
            </>
          }


        </InputGroup>
      </div>

    </>
  </>)
}