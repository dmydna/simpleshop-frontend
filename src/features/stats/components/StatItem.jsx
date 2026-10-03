import Pill from "@/components/common/Pill";

export default function StatItem({
	icon = "bi-image", 
	title = "title", 
	status= "active", 
	variantStatus="primary", 
	variant="secondary",
	data = "0"
}) {
	
	return (
		<div className="col-12 col-sm-6 col-md-4 col-lg-3  col">
			<div className="border rounded-4 mb-3 bg-light">
				<span
					className="btn p-3 w-100 rounded-4 justify-content-between align-items-start position-relative d-inline-flex"
					style={{
						lineHeight: "initial",
						padding: "10px",
						cursor: "pointer",
					 }}>
					<span className="position-relative" style={{ zIndex: "2" }}>
						<div className="small">
							<div className="m-0 text-center text-normalize mb-3 d-flex flex-column">
								<div className={`d-flex justify-content-center align-items-center bg-${variant} rounded-circle bg-opacity-10`}
									style={{ width: "40px", height: "40px" }}>
									<i className={`bi ${icon} fs-4 text-${variant}`}></i>
								</div>
							</div>
							<div className="fs-2 text-start">{ data || 0}</div>
							<p className="text-muted text-start small mt-2">
								{title}
							</p>
						</div>
					</span>
					<Pill variant={"pill-" + variantStatus}>
						{status}
					</Pill>	
{/*					<span className={`pill-${variantStatus}`} 
						style={{ fontSize: "0.675em" }}>
					</span>*/}
				</span>
			</div>
		</div>

	)
}