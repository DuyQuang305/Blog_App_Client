import React from 'react'
import { FacebookFilled, 
    TwitterSquareFilled, 
     GoogleCircleFilled, 
     YoutubeFilled, 
     LinkedinFilled } from '@ant-design/icons';

const FooterComponent = () => {
    return (
        <div className='footer__container'>
            <div className="footer-content">

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae felis scelerisque, gravida sapien non, cursus augue. Aenean id pretium turpis. Suspendisse eros nunc, sollicitudin nec.</p>

                <ul className="socials">

                    <li><a href="#"> <FacebookFilled /> </a></li>

                    <li><a href="#"> <TwitterSquareFilled /> </a></li>

                    <li><a href="#"> <GoogleCircleFilled /> </a></li>

                    <li><a href="#"> <YoutubeFilled /> </a></li>

                    <li><a href="#"> <LinkedinFilled /> </a></li>

                </ul>

            </div>

        </div>
    )
}

export default FooterComponent;
