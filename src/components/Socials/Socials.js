import React, {useContext} from 'react';
import { Container } from 'reactstrap';
import "./Socials.css"

import { ThemeContext } from '../../contexts/ThemeContext';

const Socials = () => {
    /***********  Context  ***********/
    const {theme} = useContext(ThemeContext);

    /* Methods for Changing Icon */
    const gitHubSrc = (theme === 'dark' ? require('../../assets/icons/github/github-mark-white.svg').default
                                        : require('../../assets/icons/github/github-mark.svg').default
                        )
    
    return (
        // Return a simple container carry my github.
        <Container className = "socials">
            <a
                href = "https://github.com/Robert-Baillie"
                target = "_blank"
                rel="noopener noreferrer"
                aria-label = "GitHub"
            >
                <img
                    src={gitHubSrc}
                    alt="GitHub"
                    className="github-icon"
                />
            </a>
        </Container>
    )
}

export default Socials;