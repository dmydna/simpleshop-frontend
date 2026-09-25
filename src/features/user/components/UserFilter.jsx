import { role, userStatus } from '@/utils/enums';
import FilterParams from '@features/filters/components/FilterParams'
import SelectParams from "@features/filters/components/SelectParams"

function UserFilter({close, className}){
	return(
		<FilterParams className={className} close={close} badgeParams={true}>
			<SelectParams.UserRole />
			<SelectParams.UserStatus />
		</FilterParams>
		)
}


export default UserFilter;