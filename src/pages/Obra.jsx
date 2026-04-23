import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Header2 from "../componentes/Header2";
import Divider from "../componentes/Divider";
import Footer from "../componentes/Footer";
import SearchOverlay from "../componentes/SearchOverlay";

export default function Obra() {

    const { santoId, obraId } = useParams();

    const API_URL = import.meta.env.VITE_API_URL;

    const [obra, setObra] = useState(null);

    useEffect(() => {

        fetch(`${API_URL}/api/santo/${santoId}/obra`)
        .then(res => res.json())
        .then(data => {

            const encontrada = data.data.find(
                o => o.ID === Number(obraId)
            );

            setObra(encontrada);

        });

    }, [santoId, obraId]);


    return (

        <div className="min-h-screen bg-[#F4EFE6]">

            <Header2/>
            <SearchOverlay/>

            {obra && (

                <>

                {/* HERO */}

                <section
                    id="topo"
                    className="
                        w-full
                        min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]
                        flex items-center justify-center
                        px-6">

                    <div
                        className="
                            max-w-[1200px]
                            flex flex-col md:flex-row
                            gap-6 md:gap-12
                            items-center md:items-start
                            text-center md:text-left
                        "
                        >

                        <div>

                            <h1
                                className="
                                text-[#5B1E1E]
                                text-3xl md:text-4xl lg:text-5xl
                                "
                                style={{
                                fontFamily:"Cormorant Garamond"
                                }}
                            >
                                {obra.TITULO}
                            </h1>

                            <Link
                                to={`/santo/${santoId}`}
                                className="inline-block px-8 py-3 bg-[#1C2A3A] text-white rounded border-2 border-[#B89B5E] hover:bg-[#152231] transition-all shadow-lg hover:shadow-xl"
                                style={{
                                    fontFamily: 'EB Garamond',
                                    fontSize: '1rem',
                                    fontWeight: 600
                                }}
                            >
                                Ver vida de {obra.NOME}
                            </Link>

                        </div>

                    </div>

                </section>

                <Divider/>

                {/* TEXTO COMPLETO */}

                <section className="max-w-[900px] mx-auto py-20 px-8">

                    <h2
                        className="
                        text-[#5B1E1E]
                        mb-8
                        text-center
                        text-2xl md:text-3xl lg:text-4xl
                        "
                        style={{
                        fontFamily:"Cormorant Garamond"
                        }}
                    >
                        Obra completa
                    </h2>

                    <p className="
                        text-[#3E3125]
                        text-base md:text-lg
                        leading-relaxed
                        whitespace-pre-line
                        "
                        style={{
                        fontFamily: "EB Garamond"
                        }}>

                        {obra.TEXTO}

                    </p>

                </section>

                </>

            )}
            <div id="sobre">

            <Footer/>
            </div>

        </div>

    );

}