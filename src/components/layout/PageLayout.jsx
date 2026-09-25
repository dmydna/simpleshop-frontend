import React, { Children } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";


PageLayout.Sidebar = ({ children }) => children;
PageLayout.Card = ({ children }) => children;
PageLayout.Main = ({ children }) => children;
PageLayout.Toolkit = ({ children }) => children;

export function PageLayout ({ children }){
	
  let sidebarNode = [];
  let cardNode = null;
  let mainContentNodes = [];
  let toolkitNodes = [];

  Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    // Compara el tipo del elemento con los subcomponentes

	// child.props.id === 'sidebar'
    switch(child.type){
    	case PageLayout.Sidebar: sidebarNode.push(child); break;
    	case PageLayout.Card:    cardNode = child;  break;
    	case PageLayout.Main:    mainContentNodes.push(child);  break;
    	case PageLayout.Toolkit: toolkitNodes.push(child);  break;
    }

  });


	return (
            <Container fluid="xl" className="px-4 px-lg-5 align-self-baseline">
                <Row>

                    <Col lg={3} style={{ top: '60px' }}
                        className="sticky-lg-bottom h-100 p-0 mb-3 mb-lg-0 d-none d-md-block"
                    >
                        {/* --- SIDEBAR PC --- */}
                        <div  className="island border rounded-4 overflow-hidden mb-2">
                        	{cardNode}
                    	</div>

                        <div className="island border rounded-4 shadow-none p-3">
                           {sidebarNode}
                    	</div>

                    </Col>

                    {/** -- PAGE CONTENT -- */}
                    <Col lg={9} className="p-0">

                        {/** -- CARD Mobile -- */}
                        <div className="island border rounded-4 overflow-hidden d-md-none mb-2">
                        	{cardNode}
                    	</div>
                        <div className="island border rounded-4 overflow-hidden mx-0 mx-lg-2 h-fix-100 p-4">
                            {mainContentNodes}
                        </div>
                    </Col>
                </Row>

                {/** -- MODALS & TOAST --- */}
                {toolkitNodes}
                
            </Container>
	)
}


