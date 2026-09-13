import { useMemo, useState } from "react";
import { Button, Carousel } from "react-bootstrap";

export function CarrouselChunk({ elems, children, title, chunkSize, className }) {
	
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	const slides = useMemo(() => {
		if(!Array.isArray(elems)) return []
		if (elems.length === 0) return [];
		const arr = [];
		for (let i = 0; i < elems.length; i += chunkSize) {
			const chunk = [];
			for (let j = 0; j < chunkSize; j++) {
				const index = (i + j) % elems.length;
				chunk.push(elems[index]);
			}
			arr.push(chunk);
		}
		return arr;
	}, [elems, chunkSize]);


	return (

		<>
			{slides?.length > 0 && (
				<>
				<style type="text/css">{`
					.carousel-control-prev, .carousel-control-next {width: 40px !important;}
				 `}</style>
				<div className={`row ${className} rounded  h-100`}>
					<div className='col-12 d-flex justify-content-between p-0'>
						<div>
							{title} {/* header */}
						</div>
						<div className="d-flex justify-content-center mt-3 gap-2">
							{slides.map((g, i) => (
								<Button
									key={i}
									variant={i === index ? 'primary' : 'outline-secondary'}
									size="sm"
									onClick={() => setIndex(i)}
									className="rounded-circle"
									style={{ width: 12, height: 12, padding: 0 }}
								/>
							))}
						</div>
					</div>

					<Carousel className="col-12"
						indicators={false} variant="dark" activeIndex={index} onSelect={handleSelect}>
						{slides.map((group, index) => (
							<Carousel.Item key={index}>
								<div className="row d-flex justify-content-around">
									{group.map((p) => (
										<>{children(p)}</>
									))}
								</div>
							</Carousel.Item>
						))}
					</Carousel>
				</div>
				</>
			)}
       
		</>
        
	);
}