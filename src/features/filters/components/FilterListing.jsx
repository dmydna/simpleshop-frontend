import FilterBarParams from "@f/filters/components/FilterBarParams";
import SelectParams from "@f/filters/components/SelectParams";

export default function FilterListing(){
	

	return(
		<FilterBarParams close={close} badgeParams={true}>
				<div className="d-flex flex-fill gap-3 flex-wrap flex-md-nowrap">
					<SelectParams.Tags className='w-100'/>
					<SelectParams.RangePrice  className='w-100'/>
				</div>
		</FilterBarParams>
	)
}