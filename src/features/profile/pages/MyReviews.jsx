import RemovableListItem from "@/components/common/RemovableListItem";
import { useReview } from "@/features/review/hooks/useReview";
import DataView from "@common/DataView";
import Pagination from '@features/pagination/components/Pagination.jsx';
import { useEffect } from "react";
import Header from "@/components/layout/Header";



//@deprecated
function MyReviews({ children }) {

    const { loading, error, content, currentPage, setCurrentPage, 
    totalPages,  refreshData, deleteReview } = useReview()

    useEffect(() => {
        // Lógica de paginación
        setCurrentPage(0)
    }, [])

    const handleDelete = async(id) => {
        await deleteReview(id)
        refreshData()
    }

    return (

        <DataView
            data={content}
            loading={loading}
            emptyMessage={"No tienes reseñas pendientes aún"}
            emptyIcon="bi bi-star"
            error={error}
            onRetry={refreshData}
        >
        <>
            <Header
                title="Mis reseñas"
                subtitle="Administrar lista de reseñas pedientes"
            />
            {content?.length !== 0 && content.map((item, index) =>
                <RemovableListItem
                    key={index} 
                    {...item}
                    description={`Evaluar compra #${item?.id}`}
                    className={"mb-1 rounded"}
                    toUrl={`/user/write-review?id=${item?.id}`}
                    remove={() => handleDelete(item?.id)}
                />
            )}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </>
    </DataView>
    )
}

export default MyReviews;
