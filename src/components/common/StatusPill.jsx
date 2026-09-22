import Pill from "./Pill"

export default function StatusPill({status, icon}){
	

    const classStatus = {
      // ROLES
      "ADMIN" :    {color: "pill-dark",      icon:"bi-person"},
      "CLIENT":    {color: "pill-success",   icon:"bi-person"},
      // STATUS
      "ACTIVE":    {color: "pill-primary",   icon:"bi-eye"},
      "INACTIVE":  {color: "pill-secondary", icon:"bi-eye-slash"},
      "DELETED":   {color: "pill-danger",    icon:"bi-x-circle"},
      "DRAFT":     {color: "pill-dark",      icon:"bi-copyboard"},
      // USER
      "BANNED":    {color: "pill-danger",    icon:"bi-x-circle"},
      // STOCK
      "In Stock":  {color: "pill-success",   icon:"bi-plus-circle"},
      "Low Stock": {color: "pill-warning",   icon:"bi-dash-circle"},
      "Out Stock": {color: "pill-danger",    icon:"bi-x-circle"},
      "Pending":   {color: "pill-secondary", icon:"bi-exclamation-circle"}  
    }


	return (
        <>
            {status &&
                <Pill
                  variant={classStatus[status]?.color} 
                  icon={icon || classStatus[status]?.icon}> 
                {status}</Pill>  
            }
        </>
	)
}