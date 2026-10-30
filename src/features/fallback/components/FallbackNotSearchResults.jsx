import { FeedbackMessage } from "@common/FeedbackMessage.jsx";

export default function FallbackNotSearchResults(){

    const msg = 'No se encontraron resultados. Intenta con otra busqueda o filtros.';
    return (

        <FeedbackMessage
            title="Sin coincidencias"
            message={msg}
            icon="bi-emoji-frown"
        />
    )
}
