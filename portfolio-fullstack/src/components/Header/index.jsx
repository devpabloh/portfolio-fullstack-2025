import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { useRef, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'

const Header = () =>{
    const {isOpen, toggleMenu, closeMenu, configOpen, toggleConfig, closeConfig, theme, toggleTheme, idioma, toggleIdioma } = useAppContext();
    const menuRef = useRef(null);
    const configRef = useRef(null);


    useEffect(() => {
        function handleClickOutsideConfig(event) {
            if (configRef.current && !configRef.current.contains(event.target)) {
                closeConfig();
            }
        }
        
        document.addEventListener('mousedown', handleClickOutsideConfig);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideConfig);
        };
    }, [closeConfig]);

    useEffect(() => {
        const button = document.querySelector(`.${styles.buttonMenu}`);
        
        function handleClickOutside(event) {
            if (button && button.contains(event.target)) {
                return;
            }
            
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [closeMenu]);

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
                    <li>
                    <div className={styles.configContainer} ref={configRef}>
                    <button
                        className={styles.configButton}
                        onClick={toggleConfig}
                        aria-label='Configurações'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </button>
                    {configOpen && (
                        <div className={styles.configDropdown}>
                        <div className={styles.configItem}>
                            <span>Tema</span>
                            <button onClick={toggleTheme} className={styles.themeToggle}>
                                {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
                            </button>
                        </div>
                        <div className={styles.configItem}>
                            <span>Idioma</span>
                            <button onClick={toggleIdioma} className={styles.langToggle}>
                                {idioma === 'pt-BR' ? '🇺🇸 English' : '🇧🇷 Português'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                    </li>
                </ul>
                
            </nav>
            
        </header>
    )
}

export default Header;