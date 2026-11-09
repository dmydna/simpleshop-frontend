import InputSelectParam from "@features/filters/components/InputSelectParam"
import InputRangeParam  from "@features/filters/components/InputRangeParam"
import InputCheckParam  from "@features/filters/components/InputCheckParam"
import InputSelectCheckParam from "@features/filters/components/InputSelectCheckParam"
import { status, category, availabilityStock, userStatus, role, userTypeQuery, productTypeQuery } from '@utils/enums.js';
import { useMemo } from "react";
import { useFetchTrigger } from "@/hooks/useFetchTrigger";
import { statsService } from "@/features/stats/services/statsService";


const AvalabilityStock = () => {
	return(
		<InputSelectParam
			label="availability"
			name="availabilityStock"
			Enum={availabilityStock}
		/>
	)
}


const SelectByEnum = ({content,name, label, cols, textStyle, multiseleccion}) => {

  // Extraer etiquetas únicas de los listings
	// console.log(content)
  const Tags = useMemo(() => {
    const res = new Set();
    for(let tag in content){
        res.add(content[tag]);
    };
    return Array.from(res).sort(); // Ordenar alfabéticamente para mejor UX
  }, [content]);

	return(
		<InputCheckParam
			multiselection={multiseleccion}
			className="mb-2"
			cols={multiseleccion  ? cols : 1}
			textStyle={multiseleccion  ? textStyle : 'uppercase'}
			name={name}
			label={label}
			array={Tags}
		/>
	)
}



const SelectByStats = ( domian ,{statsOf, label, cols, textStyle, multiseleccion, className}) => {

	const {data, loading, error} = useFetchTrigger({
        fetchMethod: statsService.getStatsByField,
        initialTriggers: {limit:15, entity: domian , field: statsOf}
  })

  // Extraer etiquetas únicas de los listings
  const Tags = useMemo(() => {
    const res = new Set();
    if(Array.isArray(data)){
    	data.forEach( ({name, count}) => {
        	res.add(`${name || 'sin categoria'}(${count})`);
    	});
    }

    return Array.from(res).sort(); // Ordenar alfabéticamente para mejor UX
  }, [data]);

	return(
		<InputCheckParam
			multiselection={multiseleccion}
			className={"mb-2"}
			cols={multiseleccion  ? cols : 1}
			textStyle={multiseleccion  ? textStyle : 'uppercase'}
			name={label || statsOf}
			array={Tags}
			variant={"white bg-white"}
		/>
	)
}




const Status = () => {
	return(
		<InputSelectParam
			name="status"
			Enum={status}
		/>
	)
}

const Role = () => {
	return(
		<InputSelectParam
			name="role"
			Enum={role}
		/>
	)
}



const Category = () => {

	return (
		<InputSelectParam
			name="category"
			Enum={category}
		/>
	)
}



const StatusUser = () => {
	return(
		<InputSelectParam
			name="status"
			Enum={userStatus}
		/>
	)
}




const RangePrice = () => {
    return(
    <InputRangeParam
        min={0}
        max={1500}
        type={'$'}
        name={'price'}
        variant={'white bg-white'}
    />
    )
}



export default {
  AvalabilityStock,
	Tags : ()=>SelectByStats("listings" ,{
	  cols: 2,
	  statsOf: "tags",
	  multiseleccion: true
	}),
	Category : ()=>SelectByStats("listings",{
	  cols: 1,
	  statsOf: "category",
	  textStyle: "uppercase",
	}),

	ProductStatus: ()=>SelectByStats("products",{
	  cols: 1,
	  statsOf: "status",
	  textStyle: "uppercase",
	}),

	AvailabilityStatus: ()=>SelectByStats("listings",{
	  cols: 1,
	  statsOf:"availabilityStatus",
	  label: "availability",
	  textStyle: "uppercase",
	}),

	UserStatus: ()=>SelectByStats("users",{
	  cols: 1,
	  statsOf:"status",
	  textStyle: "uppercase",
	}),

	UserRole: ()=>SelectByStats("users",{
	  cols: 1,
	  statsOf:"role",
	  textStyle: "uppercase",
	}),


	ListingStatus: ()=>SelectByStats("listings",{
	  cols: 1,
	  statsOf: "status",
	  textStyle: "uppercase",
	}),

	Status,
	StatusUser,
	RangePrice,
	Role,
	SelectByEnum,
  UserSearchBy: ()=> SelectByEnum({content: userTypeQuery, name: "type", label:"search by"}),
  ProductSearchBy: ()=> SelectByEnum({content: productTypeQuery, name: "type", label:"search by"})

}
