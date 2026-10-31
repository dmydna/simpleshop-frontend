import { Row } from "react-bootstrap";
import CategoryItem from "@common/CategoryItem";

import Img3 from "@assets/dressing-table.png";
import Img4 from '@assets/grocery.png';
import Img1 from "@assets/lipstick.png";
import Img2 from '@assets/perfume.png';
import { category } from "@utils/enums.js";
import { useParams } from "react-router-dom";



function CategoryNav({className}){

    const {filter} = useParams();
    const BASE_URL = '/products/search'

    return(
       <Row className={`mb-3 ${className} ${filter ? 'd-md-flex' : ''}`}> 
        <CategoryItem 
          className="border ps-0 rounded-4"
          image={Img1} 
          category={category.BEAUTY}
          description='salud e higiene' 
          link={`${BASE_URL}?category=${category.BEAUTY}`}
        />
        <CategoryItem 
          // variant="primary"
          className="border rounded-4"
          image={Img2} 
          description='perfumeria' 
          category={category.FRAGRANCES} 
          link={`${BASE_URL}?category=${category.FRAGRANCES}`}
        />
        <CategoryItem 
          // variant="success"
          className="border rounded-4"
          image={Img3} 
          category={category.FURNITURE} 
          description='oficina y hogar' 
          link={`${BASE_URL}?category=${category.FURNITURE}`}
        />
        <CategoryItem 
          // variant="dark"
          className="border pe-0 rounded-4"
          image={Img4} 
          description='comercio y almacen' 
          category={category.GROCERIES} 
          link={`${BASE_URL}?category=${category.GROCERIES}`}
        />
      </Row>
         
    )

}

export default CategoryNav;