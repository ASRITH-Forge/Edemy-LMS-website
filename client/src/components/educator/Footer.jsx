// Importing required modules and assets
import React from 'react'
import { assets } from '../../assets/assets'

// Footer component
const Footer = () => {

    return (
        // Footer container with responsive layout and top border
        <footer className='flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t'>
            
            {/* Left section: Logo + Divider + Copyright */}
            <div className='flex items-center gap-4'>

                {/* Website logo (visible only on medium screens and above) */}
                <img src={assets.logo} alt="logo" className='hidden md:block w-20'/>

                {/* Vertical divider line */}
                <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>

                {/* Copyright text */}
                <p className='py-4 text-center text-xs md:text-sm text-gray-500'>
                    Copyright 2025 @ GreatStack. All Rights Reserved.
                </p>
            </div>

            {/* Right section: Social media icons */}
            <div className='flex items-center gap-3 max-md:mt-4'>

                {/* Facebook link */}
                <a href="#">
                    <img src={assets.facebook_icon} alt="facebook" />
                </a>

                {/* Twitter link */}
                <a href="#">
                    <img src={assets.twitter_icon} alt="twitter" />
                </a>

                {/* Instagram link */}
                <a href="#">
                    <img src={assets.instagram_icon} alt="instagram" />
                </a>

            </div>
        </footer>
    )
}

// Exporting Footer component for use in other parts of the app
export default Footer
