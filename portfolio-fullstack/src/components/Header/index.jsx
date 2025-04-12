import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { useState, useRef, useEffect } from 'react'

const Header = () =>{
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(prevState => {
            return !prevState;
        });
    }

    useEffect(() => {
        const button = document.querySelector(`.${styles.buttonMenu}`);
        
        function handleClickOutside(event) {
            if (button && button.contains(event.target)) {
                return;
            }
            
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return(
        <header className={styles.ContainerHeader}>
            <span><Link to="/">Pablo H.</Link></span>
            <button
                 className={`${styles.buttonMenu} ${isOpen ? styles.open : ''}`}
                 onClick={toggleMenu}
                 aria-label='Menu'
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav
                ref={menuRef}
                className={`${styles.navMenu} ${isOpen ? styles.open : ''}`}
            >
                <ul className={styles.containerNav}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/sobre">Sobre</Link></li>
                    <li><Link to="/projetos">Projetos</Link></li>
                    <li><Link to="/contato">Contato</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;