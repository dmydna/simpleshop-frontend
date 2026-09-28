import CardEntity from "@/components/common/CardEntity";
import { useMemo, useEffect } from "react";
import { useUrlParams } from "@/hooks/useUrlParams";
import { URL_PRODUCT_LIST } from "@/utils/links";
import { statsService } from "@/features/stats/services/statsService";
import StatusPill from "@common/StatusPill"
import { useAsync } from "@/hooks/useAsync";
import { productService } from "@features/product/services/productService";

export default function ProductCardEntity(){
	

	const { idParam, modeParam, tableVersion } = useUrlParams()
    const stats_config = {field: "status", entity: "products"};

    // FIXME:  no esta implementado en API ni Frontend -> productService.getStatus
    const getstatus = useAsync(productService.getStatus); 
    const getstats  = useAsync(statsService.getStatsByField)

    useEffect(() => {
        getstats.execute(stats_config)
        if (idParam) { 
            getstatus.execute(idParam) 
        }
        if (tableVersion) {  
            getstatus.execute(idParam);  
            getstats.execute(stats_config)
        }
    }, [idParam, tableVersion])


	const description = useMemo(() => {
        if (idParam) {  return `# ${idParam}`  }
        if (Array.isArray(getstats.data)) {
            const { name, count } = getstats.data[0];
            return `${count} (${name.toLowerCase()})`
        }
        return "";

    }, [idParam, getstats])


	return (
        <CardEntity
            activeBack={modeParam}
            to={URL_PRODUCT_LIST}
            title={"Posts"}
            ico={"bi-box-seam"}
            description={description}
            variant={"success"}
        >
            <div style={{scale: '.9'}} className="d-inline-block mx-2">
        	   <StatusPill status={getstatus?.data?.status} />
            </div>
        </CardEntity>
	)
}