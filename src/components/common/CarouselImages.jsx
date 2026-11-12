import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';


function CarouselImages({images, children, col, className, order=false}) {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (

    <div className={`row ${className}  position-relative rounded h-100`}>
      <div className={`position-absolute bottom-0 col-12 d-flex justify-content-${order ? 'center' : 'between'}  order-${order ? 2 : 1}`}>
        <div>
         {children} {/* header */}
        </div>
          {/* carrousel dots */}
          <div style={{zIndex: 99, marginBottom: "-25px"}} className="d-flex justify-content-center gap-2 ">
          {images && images.length > 1 && images.map((g, i) => (
            <Button
              key={i}
              variant={i === index ? 'primary' : 'outline-secondary bg-white'}
              size="sm"
              onClick={() => setIndex(i)}
              className="rounded-circle"
              style={{ width: 12, height: 12, padding: 0 }}
            />
          ))} 
        </div>
      </div>
      
    {images?.length > 1 &&
    <Carousel className={`col-12 order-${order ? 1 : 2}`}
    indicators={false} variant="dark" activeIndex={index} onSelect={handleSelect}>
      {images?.map((img, index)=>(
          <Carousel.Item key={index}>
          <div className=" d-flex justify-content-around"> 
              <img src={img} height={300} />
          </div>
          </Carousel.Item>        
      ))}
     </Carousel>
    }
    {images?.length == 1 &&
      <div className=" d-flex justify-content-around"> 
          <img src={images[0]} height={300} />
      </div>
    }
    </div>
  );
}

export default CarouselImages;