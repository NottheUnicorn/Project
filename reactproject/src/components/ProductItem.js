import React from "react"
import { Button, Card, Row, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"


export default function ProductItem(props) {
const history = useHistory();
  return (
    <>
    <Row className="justify-content-center mb20">
    <Col lg="12">
     <Card  className="shadow-0 border rounded-3"> 
     <Card.Body>
              <Row>
                <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                    <img src={ props.row && props.row[5]} className="w-100" title={ props.row && props.row[1]}/>
                    <a href={ `/${props.row && props.row[3]}`}>
                      <div className="hover-overlay">
                        <div className="mask" ></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <h5>{ props.row && props.row[1]}</h5>
                  <div className="d-flex flex-row">
                    
                    <span>Category : { props.row && props.row[4]}</span>
                  </div>
                 
                  <p className=" mb-4 mb-md-0">
                  { (props.row && props.row[6]+"").substr(0,160)+"..."}
                  </p>
                </div>
                <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">Price: </h4>
                    <span className="text-danger">${ props.row && props.row[2]}</span>
                  </div>
                 
                  <div className="d-flex flex-column mt-4">
                  <Button variant="primary" size="sm" onClick={()=>history.push("/"+(props.row && props.row[3]))}>
                       Details
                      </Button>{' '}
                  </div>
                </div>
                </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
