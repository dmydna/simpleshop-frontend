import CardEntity from "@/components/common/CardEntity";
import { useMemo, useEffect } from "react";
import { useUrlParams } from "@/hooks/useUrlParams";
import { URL_LISTING_LIST } from "@/utils/links";
import { statsService } from "@/features/stats/services/statsService";
import StatusPill from "@common/StatusPill"
import { useAsync } from "@/hooks/useAsync";
import { listingService } from "@features/listing/services/listingService";

export default function ListingCardEntity(){
	

	const { idParam, modeParam, tableVersion } = useUrlParams()

    const stats_config = {field: "status", entity: "listings"};
    const getstatus = useAsync(listingService.getStatus);
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

    }, [idParam, getstats.data])


	return (
        <CardEntity
            activeBack={modeParam}
            to={URL_LISTING_LIST}
            title={idParam ? "current post": "Posts"}
            ico={"bi-sticky"}
            description={description}
            variant={"primary"}
        >
            <div style={{scale: '.9'}} className="d-inline-block mx-2">
        	   <StatusPill status={getstatus?.data?.status} />
            </div>
        </CardEntity>
	)
}