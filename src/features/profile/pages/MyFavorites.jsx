import DataView from "@/components/common/DataView";
import RemovableListItem from "@/components/common/RemovableListItem";
import { useFavorite } from '@/features/favorite/hooks/useFavorite.js';
import Pagination from '@features/pagination/components/Pagination.jsx';
import { useEffect } from "react";
import Header from "@/components/layout/Header";

function MyFavorites({ children }) {

    const { content, loading, currentPage, setCurrentPage, totalPages, 
    deleteFavorite, refreshData, error } = useFavorite({autofetch: true})

    useEffect(() => {
        // Lógica de paginación
        setCurrentPage(0)
    }, [])

    const handleDeleteFavorite = async (id) => {
        try {
            await deleteFavorite(id);
            refreshData()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <DataView
            emptyVariant="danger"
            data={content}
            error={error}
            loading={loading}
            onRetry={refreshData}
            emptyIcon="bi bi-heart"
            emptyMessage={"No tienes favoritos aún"}
        >
            <>
                <Header
                    title='Mis favoritos'
                    subtitle='Administrar lista de favoritos'
                />

                {content.map((item, index) =>
                    <RemovableListItem
                        key={index} 
                        {...item}
                        title={`${item?.title} - $${item.price}`}
                        description={`Publicacion #${item?.id}`}
                        className={"mb-1 rounded"}
                        toUrl={`/p/${item.id}`}
                        remove={() => handleDeleteFavorite(item?.id)}
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

export default MyFavorites;
