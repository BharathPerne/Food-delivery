import React from 'react'
import "./navBar.css"
import { assets } from '../../../../frontend/src/assets/admin_assets/assets'
const NavBar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <img className='profile' src={assets.profile_image} alt="" />
      
    </div>
  )
}

export default NavBar
