import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Header2 from "../componentes/Header2";
import Divider from "../componentes/Divider";
import Footer from "../componentes/Footer";
import SearchOverlay from "../componentes/SearchOverlay";

export default function Oracao() {

    const { santoId, oracaoId } = useParams();

    const API_URL = import.meta.env.VITE_API_URL;

    const [oracao, setOracao] = useState(null);



    useEffect(() => {

        fetch(`${API_URL}/api/santo/${santoId}/oracao`)
            .then(res => res.json())
            .then(data => {

                const encontrada = data.data.find(
                    o => o.ID === Number(oracaoId)
                );

                setOracao(encontrada);

            });

    }, [santoId, oracaoId]);
    if (!oracao) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <p className="text-[#5B1E1E] text-lg">
                    Carregando oração...
                </p>

            </div>

        );

    }
    return (

        <div className="min-h-screen bg-[#F4EFE6]">

            <Header2 />
            <SearchOverlay />

            {oracao && (

                <>
                    {/* HERO */}

                    <section id="topo" className="w-full min-h-[50vh] md:min-h-[70vh] flex items-center justify-center">

                        <div className="
                        max-w-[900px]
                        flex
                        flex-col
                        items-center
                        text-center
                        gap-6
                        px-4
                        md:px-8">

                            <div>

                                <h1
                                    className="
                                text-[#5B1E1E]
                                text-3xl
                                sm:text-4xl
                                md:text-5xl
                                "
                                    style={{
                                        fontFamily: "Cormorant Garamond"
                                    }}
                                >
                                    {oracao.TITULO}
                                </h1>

                                <Link
                                    to={`/santo/${santoId}`}
                                    className="
                                    inline-block
                                    mt-4
                                    px-6
                                    sm:px-8
                                    py-2
                                    sm:py-3
                                    text-sm
                                    sm:text-base
                                    bg-[#1C2A3A]
                                    text-white
                                    rounded
                                    border-2
                                    border-[#B89B5E]
                                    hover:bg-[#152231]
                                    transition-all
                                    shadow-lg
                                    hover:shadow-xl
                                    "
                                    style={{
                                        fontFamily: 'EB Garamond'
                                    }}
                                >
                                    Ver vida de {oracao.NOME}
                                </Link>

                            </div>

                        </div>

                    </section>

                    <Divider />

                    {/* TEXTO COMPLETO */}

                    <section className="
                    max-w-[900px]
                    mx-auto
                    py-12
                    md:py-20
                    px-4
                    md:px-8">

                        <h2
                            className="
                            text-[#5B1E1E]
                            mb-8
                            text-center
                            text-2xl
                            sm:text-3xl
                            md:text-4xl"
                            style={{
                                fontFamily: "Cormorant Garamond"
                            }}
                        >
                            Oração completa
                        </h2>

                        <p className="
                        text-[#3E3125]
                        text-base
                        sm:text-lg
                        leading-relaxed
                        whitespace-pre-line
                        max-w-[70ch]
                        mx-auto">

                            {oracao.TEXTO}

                        </p>

                    </section>


                </>


            )}
            <div id="sobre">

                <Footer />
            </div>

        </div>

    );

}