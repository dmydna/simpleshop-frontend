import CategoryCarrousel from "@/components/common/CategoryCarrousel";
import CategoryNav from "@/components/common/CategoryNav";
import { useUrlParams } from "@/hooks/useUrlParams";
import FilterBarParams from "@f/filters/components/FilterBarParams";
import SelectParams from "@f/filters/components/SelectParams";

export default function CatalogeFilter(){
	
	const { filterParam } = useUrlParams()

	return(
	<>
		{filterParam === 'show' && <>
        	<CategoryNav className='d-none d-md-block' />
        	<CategoryCarrousel className='d-block d-md-none' />
	
			<FilterBarParams badgeParams={true}>
				<div className="d-flex flex-fill gap-3 flex-wrap flex-md-nowrap">
					<SelectParams.Tags className='w-100'/>
					<SelectParams.RangePrice  className='w-100'/>
				</div>
			</FilterBarParams>
		</>}
	</>	
	)
}