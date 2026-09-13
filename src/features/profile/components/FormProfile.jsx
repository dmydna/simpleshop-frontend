import InputFloating from "@/components/common/InputFloating";
import { Children } from "react";
import { Form } from "react-bootstrap";

export default function FormProfile({children, className="", id, formHook, submit}) {
	
	const {register, errors, loading} = formHook

	return (
		<Form className={className} id={id} onSubmit={submit} >

			<InputFloating
				placeholder="Ingrese Nombre"
				type="text"
				name="firstName"
				register={register}
				errors={errors}
				disabled={loading}
			/>

			<InputFloating
				placeholder="Ingrese Apellido"
				type="text"
				name="lastName"
				register={register}
				errors={errors}
				disabled={loading}
			/>

   		    <div className="d-flex gap-0 gap-md-3 flex-wrap flex-md-nowrap">
				<InputFloating
					className={'mb-0 w-100'}
					placeholder="Ingrese Domicilio"
					type="text"
					name="address"
					register={register}
					errors={errors}
					disabled={loading}
				/>
	
				<InputFloating
					className={'mb-0 w-100'}
					placeholder="Ingrese Telefono"
					type="text"
					name="phone"
					register={register}
					errors={errors}
					disabled={loading}
				/>
			</div>
			
			<InputFloating
				className={'mb-0 w-100'}
				placeholder="Ingrese Ciudad"
				type="text"
				name="city"
				register={register}
				errors={errors}
				disabled={loading}
			/>

    
    		<div className="d-flex gap-0 gap-md-3 flex-wrap flex-md-nowrap">

				<InputFloating
					className={'mb-0 w-100'}
					placeholder="Ingrese Estado"
					type="text"
					name="state"
					register={register}
					errors={errors}
				    disabled={loading}
				/>
	
				<InputFloating
					className={'mb-0 w-100'}
					placeholder="Ingrese Codigo Postal"
					type="number"
					name="zipCode"
					register={register}
					errors={errors}
					disabled={loading}
				/>

			</div>

		{children}

		</Form >
	)
}