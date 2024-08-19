import React, {useContext} from 'react';
import { Container } from 'reactstrap';
import "./Socials.css"

import { ThemeContext } from '../../contexts/ThemeContext';

import socials from '../Socials/socials.json'

const Socials = () => {
    /***********  Context  ***********/
    const {theme} = useContext(ThemeContext);

    /* Methods for Changing Icon */
    const gitHubSrc = (theme === 'dark' ? require('../../assets/icons/github/github-mark-white.svg').default
                                        : require('../../assets/icons/github/github-mark.svg').default
                        )

    const linkedInSrc = (require('../../assets/icons/linkedin/LI-In-Bug.svg').default)
    
    const emailSrc = (theme === 'dark' ? require('../../assets/icons/email/email_dark_theme.svg').default
                : require('../../assets/icons/email/email_light_theme.svg').default
)

    return (
        // Return a simple container carry my github.
        <Container className = "socials">
            {/* GitHub */}
            <a
                href = {socials.githubUrl}
                target = "_blank"
                rel="noopener noreferrer"
                aria-label = "GitHub"
            >
                <img
                    src={gitHubSrc}
                    alt="GitHub"
                    className="icon"
                />
            </a>
            
            {/*LinkedIn */}
            <a
                href = {socials.linkedinUrl}
                target = "_blank"
                rel="noopener noreferrer"
                aria-label = "LinkedIn"
            >
                <img
                    src={linkedInSrc}
                    alt="LinkedIn"
                    className="icon"
                />
            </a>

            {/*Email*/}
            <a
                href = {socials.email}
                target = "_blank"
                rel="noopener noreferrer"
                aria-label = "Email"
            >
                <img
                    src={emailSrc}
                    alt="Email"
                    className="icon"
                />
            </a>
        </Container>
    )
}

export default Socials;