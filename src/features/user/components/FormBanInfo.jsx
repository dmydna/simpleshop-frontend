import { arrayToDate } from "@/utils/mappers";
import { useMemo } from "react";

export default function FormBanInfo({ banExpiresAt, bannedAt, banReason }) {
	
	const calculateDays = useMemo(() => {
		if (!banExpiresAt) return 0;

		const now = new Date();
		const expiration = arrayToDate(banExpiresAt);

		// Diferencia en milisegundos
		const diffInMs = expiration.getTime() - now.getTime();

		// Conversión de milisegundos a días (1000ms * 60s * 60m * 24h = 86,400,000 ms)
		const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

		// Garantizar que no retorne valores negativos si el tiempo ya venció
		return diffInDays > 0 ? diffInDays : 0;
	}, [banExpiresAt]);

	// Formateo opcional de la fecha para mostrarla de forma legible si viene como ISO/Timestamp
	const formattedDate = (dateArray) => {
		if (!dateArray) return 'N/A';
		const date = arrayToDate(dateArray);
		return isNaN(date.getTime())
			? dateArray
			: date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
	};


	return (
		<div className="p-3 border rounded mb-2">
			<p className="fw-semibold text-center">Account Suspend</p>
		
			<div>
				<p className="small text-secondary mb-0">Ban Expires</p>
				<p className="small text-danger">{ formattedDate(banExpiresAt)} ( {calculateDays > 1 ? calculateDays + ' days' : calculateDays + ' day'} )</p>
			</div>
			<div>
				<p className="small text-secondary mb-0">Banned on</p>
				<p className="small text-success">{formattedDate(bannedAt)}</p>
			</div>
			<div>
				<p className="small text-secondary mb-0">Ban Reason</p>
				<p className="small">{banReason}</p>
			</div>

		</div>
	)
}