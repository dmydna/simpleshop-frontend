import { FeedbackMessage } from "./FeedbackMessage";

export default function ListEmpty(){

    const TITLE = 'List is Empty'
    const MESSAGE = 'Add items to start';

    return (
    	<div className="py-5">
        	<FeedbackMessage
        	    icon={"bi-list-ul"}
        	    title={TITLE}
        	    message={MESSAGE}
        	    variant={"secondary"}
        	    listFix={"min-vh-md-70"}
        	/>
        </div>
    )
}