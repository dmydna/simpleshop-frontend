import CenterLayout from "@/components/layout/CenterLayout";
import FallbackError from "@/features/fallback/components/FallbackError";
export default function PageError({error, handle}){
    return (
        <CenterLayout>
            <FallbackError error={error} handle={handle}/>
        </CenterLayout>
    )
}