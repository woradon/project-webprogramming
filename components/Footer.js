import React from 'react'
import {Parallax} from 'react-parallax'
import Fade from 'react-reveal/Fade'

function Footer() {
    return(
        <footer>
            <div className="container">
                <div className="sec aboutus">
                    <Fade bottom>
                        <h2>About Us</h2>
                    </Fade>
                    <Fade bottom>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat suscipit
                        quibusdam, earum aperiam, blanditiis neque porro libero nulla molestiae ipsa minus 
                        doloremque itaque obcaecati dolor, necessitatibus temporibus sit tempora maxime?</p>
                    </Fade>
                    <Fade bottom>
                        <ul className="sci">
                            <li><a herf="https://www.facebook.com/OatWoradon" className=""><i className="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                            <li><a herf="#"><i className="fab fa-instagram" aria-hidden="true"></i></a></li>
                            <li><a herf="#"><i className="fab fa-twitter" aria-hidden="true"></i></a></li>
                            <li><a herf="#"><i className="fab fa-youtube" aria-hidden="true"></i></a></li>
                        </ul>
                    </Fade>
                    
                </div>
                <div className="sec quickLinks">
                    <Fade bottom>
                        <h2>Quick Links</h2>
                    </Fade>
                    <Fade bottom>
                        <ul>
                            <li><a herf="#">About</a></li>
                            <li><a herf="#">FAQ</a></li>
                            <li><a herf="#">Privacy Policy</a></li>
                            <li><a herf="#">Help</a></li>
                            <li><a herf="#">Terms & Consitions</a></li>
                            <li><a herf="#">Contact</a></li>
                        </ul>
                    </Fade>
                    
                </div>
                <div className="sec contact">
                    <Fade bottom>
                        <h2>Contact Info</h2>
                    </Fade>
                    <Fade bottom>
                        <ul className="info">
                            <li>
                                <span><i className="fas fa-map-marker-alt" aria-hidden="true"></i></span>
                                <span>Thailand, Bangkok </span>
                            </li>
                            <li>
                                <span><i className="fas fa-phone-alt" aria-hidden="true"></i></span>
                                <p><a herf="#">+1 234 567 8900</a><br/></p>
                            </li>
                            <li>
                                <span><i className="fas fa-envelope" aria-hidden="true"></i></span>
                                <p><a href="#">oat_45122@hotmail.com</a></p>
                            </li>
                        </ul>
                    </Fade>
                    
                </div>
                
            </div>
        </footer>
    )
}

export default Footer;