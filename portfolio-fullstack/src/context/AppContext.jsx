import { createContext, useState, useContext, useEffect } from "react";

// criando um contexto para o app
const AppContext = createContext();

// criando um provider para o app, um provider é um componente que fornece um contexto para o app
export function AppProvider({children}){
    // aqui colocamos os estados que queremos compartilhar com o app
    const [isOpen, setIsOpen] = useState(false);
    const [configOpen, setConfigOpen] = useState(false);
    const [idioma, setIdioma] = useState('pt-BR');
    const [theme, setTheme] = useState(() => {
        // Verifica se tem preferência salva
        return localStorage.getItem('theme') || 'light';
    });

     // Efeito para aplicar o tema
    useEffect(() => {
        // Aplica o tema direto no elemento HTML
        document.documentElement.setAttribute('data-theme', theme);
        // Salva a preferência
        localStorage.setItem('theme', theme);
        
        // Método alternativo: adiciona/remove uma classe
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [theme]);

    // função para alternar o tema do app
    const toggleMenu = ()=>{setIsOpen(prevState => !prevState)}
    const closeMenu = () => setIsOpen(false);

    //função para abrir/fechar o menu de configurações
    const toggleConfig=()=> setConfigOpen(prevState => !prevState)
    const closeConfig = ()=> setConfigOpen(false)

    const toggleTheme = ()=>{
        setTheme(prevState => prevState === 'light' ? 'dark' : 'light');
    }
    const toggleIdioma = ()=>{
        setIdioma(prevState => prevState === 'pt-BR' ? 'en-US' : 'pt-BR');
    }

    // valores que queremos compartilhar com o app
    const value = {
        isOpen,
        closeMenu,
        configOpen,
        toggleConfig,
        closeConfig,
        theme,
        idioma,
        toggleMenu,
        toggleTheme,
        toggleIdioma        
    };

    // retornando o provider com o valor do contexto e o children que é o componente que vai usar o contexto
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// criando um hook para usar o contexto
export const useAppContext = ()=>{
    const context = useContext(AppContext);
    return context;
}
