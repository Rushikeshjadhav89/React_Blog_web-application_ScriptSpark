import React from 'react'
import { MDBCard, MDBRow, MDBCol, MDBCardImage, MDBCardBody } from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'

const LatestBlog = ({ id, title, imageURL }) => {
    return (
        <div>
            <Link to={`/blog/${id}`}>
                <MDBCard>
                    <MDBRow>
                        <MDBCol>
                            <MDBCardImage src={imageURL} alt={title} fluid className='rounded-circle' style={{ height: '80px' }} />
                        </MDBCol>
                        <MDBCol md='9'>
                            <MDBCardBody>
                                <p className="text-start latest-title">{title}</p>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </Link>
        </div>
    )
}

export default LatestBlog