import { useProduct } from '@/features/product/hooks/useProduct';
import FilterParams from '@features/filters/components/FilterParams'
import SelectParams from "@features/filters/components/SelectParams"


// TODO: implementar logica real de filtro
function ProductFilter({close, className}){

	const {content} = useProduct()
	return(
		<FilterParams className={className}  close={close} badgeParams={true}>
			<SelectParams.Tags  content={content}/>
			<SelectParams.Category />
			<SelectParams.ProductStatus />
		</FilterParams>
		)
}


export default ProductFilter;
