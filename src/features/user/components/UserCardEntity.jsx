import CardEntity from "@/components/common/CardEntity";
import { useMemo, useEffect } from "react";
import { useUrlParams } from "@/hooks/useUrlParams";
import { URL_USER_LIST } from "@/utils/links";
import { statsService } from "@/features/stats/services/statsService";
import StatusPill from "@common/StatusPill"
import { useAsync } from "@/hooks/useAsync";
import { userService }  from "@/features/user/service/userService";

export default function UserCardEntity(){
	

	const { idParam, modeParam, tableVersion } = useUrlParams()
    const stats_config = {field: "status", entity: "users"};

    // FIXME:  no esta implementado en API ni Frontend -> userService.getStatus
    const getstatus = useAsync(userService.getStatus); 
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
            to={URL_USER_LIST}
            title={idParam ? "current user": "Users"}
            ico={"bi-person"}
            description={description}
            variant={"danger"}
        >
            <div style={{scale: '.9'}} className="d-inline-block mx-2">
        	   <StatusPill status={getstatus?.data?.status} />
            </div>
        </CardEntity>
	)
}