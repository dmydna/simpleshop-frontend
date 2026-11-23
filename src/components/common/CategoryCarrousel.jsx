import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Img3 from "@assets/dressing-table.png";
import Img4 from '@assets/grocery.png';
import Img1 from "@assets/lipstick.png";
import Img2 from '@assets/perfume.png';
import { category } from "@utils/enums.js";
import CategoryItem from "@common/CategoryItem";

function CategoryCarrousel({className}){
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <style>{`
        .carousel-control-next {filter: invert(1);}
        .carousel-control-prev {filter: invert(1);}
       `}</style>

    <Carousel className={`${className}`} activeIndex={index} onSelect={handleSelect}>

      <Carousel.Item>
        <CategoryItem 
          col='col-12 col-md-12 col-lg-3'
          className="border ps-0 rounded-4"
          image={Img1} 
          category={category.BEAUTY}
          description='salud e higiene' 
          link={`/products?category=${category.BEAUTY}`}
        />
      </Carousel.Item>  
      <Carousel.Item>
        <CategoryItem 
          // variant="primary"
          col='col-12 col-md-12 col-lg-3'
          className="border rounded-4"
          image={Img2} 
          description='perfumeria' 
          category={category.FRAGRANCES} 
          link={`/products?category=${category.FRAGRANCES}`}
        />
      </Carousel.Item>
      <Carousel.Item>
        <CategoryItem 
          // variant="success"
          col='col-12 col-md-12 col-lg-3'
          className="border rounded-4"
          image={Img3} 
          category={category.FURNITURE} 
          description='oficina y hogar' 
          link={`/products?category=${category.FURNITURE}`}
        />
      </Carousel.Item>
      <Carousel.Item>
        <CategoryItem 
          // variant="dark"
          col='col-12 col-md-12 col-lg-3'
          className="border pe-0 rounded-4"
          image={Img4} 
          description='comercio y almacen' 
          category={category.GROCERIES} 
          link={`/products?category=${category.GROCERIES}`}
        />
      </Carousel.Item>
    </Carousel>
    </>
  );

}

export default CategoryCarrousel;



