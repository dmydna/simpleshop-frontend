import { FeedbackMessage } from "@common/FeedbackMessage.jsx";

export default function FallbackNotSearchResults(){

    const msg = 'Try adjusting your filters or search termns.';
    return (

        <FeedbackMessage
            title="No results found"
            message={msg}
            icon="bi-search"
        />
    )
}
