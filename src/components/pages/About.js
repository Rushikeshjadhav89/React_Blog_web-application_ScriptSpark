import React from 'react'
import {MDBContainer, MDBTypography} from 'mdb-react-ui-kit'

const About = () => {
  return (
    <div style={{marginTop: '100px'}}>
        <MDBContainer>
          <MDBTypography note noteColor='primary'>
              It is Blogging website where you will find Blogs with different category
          </MDBTypography>
        </MDBContainer>
    </div>
  )
}

export default About