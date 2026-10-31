import FilterParams from '@features/filters/components/FilterParams'
import SelectParams from "@features/filters/components/SelectParams"

// TODO: implementar filtro listing.availabilityStock
function ListingFilter({close, className}){
	return(
		<FilterParams className={className}  close={close} badgeParams={true}>
			<SelectParams.Tags/>
			<SelectParams.Category />
			<SelectParams.AvailabilityStatus />
			<SelectParams.ListingStatus />
			<SelectParams.RangePrice />
		</FilterParams>
		)
}


export default ListingFilter;