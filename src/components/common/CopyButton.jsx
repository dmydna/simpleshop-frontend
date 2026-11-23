import React, { useState } from "react";
import {Button} from "react-bootstrap";

export default function CopyButton({value, message, showMessage=true, className, style}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={style || {}} className={className || {}}  onClick={handleCopy}>
            {copied ?
                (<i className="bi bi-check-circle btn small bg1-hover p-2 rounded"></i>) :
                (<i className="bi bi-copy btn  small bg1-hover p-2 rounded"></i>)}
            {showMessage && <span>{message || value}</span>}
        </div>
    );
}