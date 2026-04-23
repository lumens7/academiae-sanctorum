import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSearch } from "./SearchProvider";

export default function Header() {

    const navigate = useNavigate();

    const {
        searchTerm,
        setSearchTerm,
        setResults
    } = useSearch();

    const [open, setOpen] = useState(false);

    const handleClick = (link) => {

        navigate(link);
        setSearchTerm("");
        setResults([]);
        setOpen(false);

    };

    return (

        <header className="bg-[#1C2A3A] sticky top-0 z-50 shadow-lg">

            <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-[80px] flex items-center justify-between">

                <Link to="/" className="flex items-center gap-3">

                    <img
                        
                        src="https://raw.githubusercontent.com/lumens7/ACADEMIAE-SANCTORUM-FOTOS/refs/heads/main/logo.png"
                        alt="Logo"
                        className="w-16 md:w-20"
                    />

                    <span
                        className="text-white text-lg md:text-2xl"
                        style={{
                            fontFamily: "Cormorant Garamond",
                            fontWeight: 600
                        }}
                    >

                        Academiae Sanctorum

                    </span>

                </Link>

                {/* BOTÃO MOBILE */}

                <button
                    className="md:hidden text-white"
                    onClick={() => setOpen(!open)}
                >

                    {open ? <X /> : <Menu />}

                </button>

                {/* MENU */}

                <nav
                    className={`absolute md:static top-[80px] left-0 w-full md:w-auto bg-[#1C2A3A] md:bg-transparent flex flex-col md:flex-row gap-6 md:gap-8 items-center transition-all duration-300 ${open ? "flex" : "hidden md:flex"
                        }`}
                >

                    <Link to="/" className="text-white hover:text-[#B89B5E]">
                        Início
                    </Link>

                    <a href="#santos" className="text-white hover:text-[#B89B5E]">
                        Santos
                    </a>

                    <a href="#oracoes" className="text-white hover:text-[#B89B5E]">
                        Orações
                    </a>

                    <a href="#novena" className="text-white hover:text-[#B89B5E]">
                        Novena
                    </a>

                    <a href="#sobre" className="text-white hover:text-[#B89B5E]">
                        Sobre
                    </a>

                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="hidden md:block px-3 py-1 rounded bg-white text-black"
                    />

                </nav>

            </div>
            {/* SEARCH MOBILE */}
            <div className="md:hidden px-6 pb-3 bg-[#1C2A3A]">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white text-black"
                />
            </div>
        </header>


    );

}