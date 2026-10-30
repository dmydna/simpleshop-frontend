import { useWindowsWidth } from "@contexts/useWindowSize.jsx";
import { useListing } from "@f/listing/hooks/useListing.js";
import { useEffect, useMemo, useState } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUrlParams } from "@hooks/useUrlParams"
import { useUrlState } from "@hooks/useUrlState"

function Search({toggle, setToggle}){
    
    const width = useWindowsWidth()
    const navigate = useNavigate();
    const location = useLocation();
    const { filterParam } = useUrlParams()
    const { setSearchParams }  = useUrlState() 


    const [query, setQuery] = useState(""); 
    const {listings, setFilters, totalElements} = useListing({autofetch: true});

    const [show, setShow] = useState(false);

    const BASE_URL = "/products/search"


    function handleChange(e) {
      const value = e.target.value;
      setQuery(value);
      setShow(!!value); // se abre si hay texto
    }

    function handleSubmit(e){
      e.preventDefault();
      !! query && 
      navigate(`${BASE_URL}?query=${query}`);
      setFilters({query: query})
      setToggle(false);
      setShow(false);
    }

    function handleFilter(e) {
      e.preventDefault();
      if(window.location.pathname === `${BASE_URL}`){
        if(filterParam == 'show'){
          setSearchParams(prev => ({...prev, filter: null}) )
         }else{
          setSearchParams(prev => ({...prev, filter: 'show'} )) 
        }
        return
      }
      navigate(`${BASE_URL}?filter=show`);
    }
    
    
    // Filtro para la lista de coincidencias
    useEffect(() => {
      if (!query) return ;
      setFilters({page:0, query: query})
    }, [listings, query]);

    return (
      <div className="d-flex w-100">
        
        <Form
          onSubmit={handleSubmit}
          className={`w-100 bg-white border mx-2 rounded custom-input-group  
            ${ !toggle && width < 1300 ? "d-none" : "" } `}
        >
          
          <InputGroup>
            <input
              type="text"
              placeholder="Buscar productos..."
              className={`form-control border-0 no-focus`}
              value={query}
              onChange={handleChange}
              onClick={() => (!!query ? setShow(true) : {})}
            />
            {/** FILTER */}
            <Button
              style={{opacity: .4}}
              variant="ligth"
              className={`bi bi-sliders border-0 hover-icon`}
              onClick={(e)=> handleFilter(e)} >
            </Button>
            <Button variant="ligth" 
              style={{opacity: .4}}
              className={`bi-search border-0 hover-icon`}
              onClick={(e)=> handleSubmit(e)} >
            </Button>
          </InputGroup>
          <Dropdown
            show={show}
            onToggle={(isOpen) => setShow(isOpen)}
            style={{zIndex: 99999 }}
          >
            {/* !! convierte a booleano cualquier expresion */}
            <Dropdown.Menu className={`w-100 position-absolute`}>
              {listings?.slice(0,6).map((p) => (
                <Dropdown.Item
                  onClick={() => {
                    setShow(false);
                    setToggle(false);
                  }}
                  className="overflow-hidden text-truncate"
                  as={Link}
                  to={`/products/${p.id}/${p.title}`}
                  key={p.id}
                >
                  {p.title}
                </Dropdown.Item>
              ))}
                  <Dropdown.Item
                  onClick={() => {
                    setShow(false);
                    setToggle(false);
                  }}
                  className="text-truncate overflow-hidden py-2 border-top"
                  as={Link}
                  to={`${BASE_URL}?query=${query}`}
                  key={99}
                >
                 (<b>{totalElements}</b>) Resultados Encontrados 
                </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form>
        {/** SEARCH */}
        <Button
          onClick={()=> setToggle((prev)=>!prev)}
          variant="ligth"
          className={`bg-transparent  d-xl-none border-0 bi
              ${ toggle ? "bi-x-lg" : "bi-search"} `}>
        </Button>
      </div>
    );
}

export default Search