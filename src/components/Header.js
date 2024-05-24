import React from 'react';
import  { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdb-react-ui-kit';

const Header = () => {
  
  
    const [openNavColor, setOpenNavColor] = useState(false);
    const [openNavColorSecond, setOpenNavColorSecond] = useState(false);
    const [openNavColorThird, setOpenNavColorThird] = useState(false);
  
  
  
    return (
    <div>
      
        <MDBNavbar expand='lg' dark bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'><h3>ScriptSpark</h3></MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavColorSecond(!openNavColorSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse open={openNavColorSecond} navbar id='navbarColor02'>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/edit'>Add Blog</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/about'>About</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>   
    </div>
  )
}

export default Header