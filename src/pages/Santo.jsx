import { useState, useEffect } from "react";

import Header from "../componentes/Header";
import Carousel from "../componentes/Carousel";
import Divider from "../componentes/Divider";
import SantoCard from "../componentes/SantoCard";
import OracaoCard from "../componentes/OracaoCard";
import MusicaCard from "../componentes/MusicaCard";
import ObrasCard from "../componentes/ObrasCard";
import NovenaCard from "../componentes/NovenaCard";
import Footer from "../componentes/Footer";
import SearchOverlay from "../componentes/SearchOverlay";

import { useParams } from "react-router-dom";

export default function Santo() {
    const { id } = useParams();

    const API_URL = import.meta.env.VITE_API_URL;

    const [santo, setSanto] = useState(null);
    const [oracoes, setOracoes] = useState([]);
    const [novena, setNovena] = useState(null);
    const [musicas, setMusicas] = useState([]);
    const [outrosSantos, setOutrosSantos] = useState([]);
    const [obras, setObras] = useState([]);

    const fetchData = async (url, setter, transform = (d) => d) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setter(transform(data));
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
        }
    };

    const categoriaStyles = {
        "apóstolos": "bg-[#1C2A3A] text-white",
        "mártires": "bg-[#8B0000] text-white",
        "confessores": "bg-[#2E4057] text-white",
        "bispos": "bg-[#5B1E1E] text-white",
        "presbiteros": "bg-[#7A5C2E] text-white",
        "beatos": "bg-[#B89B5E] text-[#1C2A3A]",
        "veneráveis": "bg-[#C9B037] text-[#1C2A3A]",
        "santos": "bg-[#265143] text-white",
        "virgens": "bg-[#8E44AD] text-white",
        "doutores": "bg-[#34495E] text-white",
        "mulheres santas": "bg-[#D36BA6] text-white"
    };

    useEffect(() => {
        fetchData(`${API_URL}/api/santo/${id}`, setSanto);
    }, [id]);

    useEffect(() => {
        fetchData(
            `${API_URL}/api/santo/${id}/oracao`,
            setOracoes,
            (data) => data.data || []
        );
    }, [id]);

    useEffect(() => {
        fetchData(
            `${API_URL}/api/santo/${id}/musicas`,
            setMusicas,
            (data) => data.data || []
        );
    }, [id]);
    useEffect(() => {
        fetchData(
            `${API_URL}/api/santo/${id}/obra`,
            setObras,
            (data) => data.data || []
        );
    }, [id]);

    useEffect(() => {
        fetchData(
            `${API_URL}/api/santo/${id}/novena`,
            (data) => {
                if (data.length) setNovena(data[0]);
            },
            (data) => data.data || []
        );
    }, [id]);

    useEffect(() => {

  const carregarOutrosSantos = async () => {

        const MAX_ID = 20;
        const QUANTIDADE = 3;

        const santosEncontrados = [];
        const idsTestados = new Set();

        while (
        santosEncontrados.length < QUANTIDADE &&
        idsTestados.size < MAX_ID
        ) {

        const randomId = Math.floor(Math.random() * MAX_ID) + 1;

        if (
            idsTestados.has(randomId) ||
            randomId === Number(id)
        ) continue;

        idsTestados.add(randomId);

        try {

            const res = await fetch(`${API_URL}/api/santo/${randomId}`);

            if (!res.ok) continue;

            const data = await res.json();

            if (data?.ID) {

            santosEncontrados.push(data);

            }

        } catch (err) {

            console.error("Erro buscando santo:", err);

        }

        }

        setOutrosSantos(santosEncontrados);

    };

    if (id) carregarOutrosSantos();

    }, [id]);
    const categorias =
        santo?.CATEGORIAS?.split("|").map(c => c.trim().toLowerCase()) || [];
    if (!santo) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#5B1E1E] text-lg">
                    Carregando santo...
                </p>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-[#F4EFE6]  ">
            <Header />
            <SearchOverlay />
            {santo && (

                <section className="w-full min-h-[50vh] md:min-h-[70vh] flex items-center justify-center bg-[#F4EFE6] ">

                    <div className="
                max-w-[1200px]
                flex
                flex-col
                md:flex-row
                gap-8
                md:gap-12
                items-center
                px-4
                md:px-8
                text-center
                md:text-left
            ">

                        <img
                            src={santo.FOTO_PRINCIPAL}
                            className="
                    w-[220px]
                    sm:w-[260px]
                    md:w-[350px]
                    rounded-lg
                    shadow-xl
                    object-cover
                    "
                        />

                        <div>

                            <h1
                                className="
                    text-[#5B1E1E]
                    text-3xl
                    sm:text-4xl
                    md:text-5xl
                    "
                            >
                                {santo.NOME}
                            </h1>
                            <div className="
                    flex
                    flex-wrap
                    gap-2
                    mt-4
                    justify-center
                    md:justify-start
                ">
                                {categorias.map(cat => (

                                    <span
                                        key={cat}
                                        className={`
                            px-3 py-1
                            rounded-full
                            text-xs
                            font-semibold
                            tracking-wide
                            uppercase
                            ${categoriaStyles[cat] || "bg-gray-300"}
                        `}
                                    >
                                        {cat}
                                    </span>

                                ))}
                            </div>

                            <p className="
                    text-[#3E3125]
                    text-lg sm:text-xl
                    leading-relaxed
                    leading-relaxed
                    max-w-[70ch]
                    mx-auto
                    ">
                                {santo.RESUMO_VIDA}
                            </p>

                        </div>

                    </div>

                </section>

            )}
            <Divider />
            {santo && (

                <section className="
            max-w-[900px]
            mx-auto
            py-12
            md:py-20
            px-4
            md:px-8
        ">

                    <h2
                        className="
                text-[#5B1E1E]
                mb-8
                text-center
                text-2xl
                sm:text-3xl
                md:text-4xl"
                        style={{ fontFamily: "Cormorant Garamond" }}
                    >
                        História
                    </h2>

                    <p className="
            text-[#3E3125]
            text-base
            sm:text-lg
            leading-relaxed
            max-w-[70ch]
            mx-auto
            ">
                        {santo.DESCRICAO_DETALHADA}
                    </p>

                </section>

            )}
            {oracoes.length > 0 && (
                <>
                    <Divider />
                    <section id="oracoes" className="py-16 max-w-[75em] mx-auto px-4 md:px-8">

                        <h2 
                            className="
                text-[#5B1E1E]
                mb-8
                text-center
                text-2xl
                sm:text-3xl
                md:text-4xl"
                            style={{ fontFamily: "Cormorant Garamond" }}
                        >
                            Orações
                        </h2>

                        <Carousel>

                            {oracoes.map(oracao => (

                                <OracaoCard
                                    key={oracao.ID}
                                    id={oracao.ID}
                                    santoId={id}
                                    titulo={oracao.TITULO}
                                    texto={oracao.TEXTO}
                                />

                            ))}

                        </Carousel>

                    </section>
                </>
            )}
            {obras.length > 0 && (
                <> 
                <Divider />
                <section className="py-16 max-w-[75em] mx-auto px-4 md:px-8">

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
                        Obras de {santo?.NOME}
                    </h2>

                    <Carousel>

                        {obras.map(obra => (

                            <ObrasCard
                                key={obra.ID}
                                id={obra.ID}
                                santoId={id}
                                titulo={obra.TITULO}
                                texto={obra.TEXTO}
                                nomeSanto={obra.NOME}
                            />

                        ))}

                    </Carousel>

                </section>
                </>
            )}


            {musicas.length > 0 && (
                <>
                <Divider />
                <section className="py-16 max-w-[75em] mx-auto px-4 md:px-8">

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
                        Músicas em honra a {santo?.NOME}
                    </h2>

                    <Carousel>

                        {musicas.map(musica => (

                            <MusicaCard
                                key={musica.ID}
                                nome={musica.NOME}
                                letra={musica.LETRA}
                                link={musica.LINK}
                            />

                        ))}

                    </Carousel>

                </section>
                </>
            )}

            {novena && (
                <>
                <Divider />
                <section id="novena" className="
                py-12
                md:py-20
                flex
                flex-col
                items-center
                rounded-xl
                mx-4
                md:mx-8">

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
                        Novena em honra a {novena.NOME}
                    </h2>

                    <NovenaCard
                        key={novena.ID}
                        id={novena.ID}
                        santoId={id}
                        titulo={novena.TITULO}
                        texto={novena.TEXTO}
                        nomeSanto={novena.NOME}
                        dataComemoracao={novena.DATA_CANONIZACAO}
                    />

                </section>
                </>
            )}
            <Divider />
            <section id="santos" className="py-16 max-w-[75em] mx-auto px-4 md:px-8">

                <h2 
                    className="
                    text-[#5B1E1E]
                    mb-8
                    text-center
                    text-2xl
                    sm:text-3xl
                    md:text-4xl"
                    style={{ fontFamily: "Cormorant Garamond" }}
                >
                    Outros Santos
                </h2>

                <Carousel>

                    {outrosSantos.map(s => (

                        <SantoCard
                            key={s.ID}
                            id={s.ID}
                            nome={s.NOME}
                            datas={s.DATA_CANONIZACAO}
                            descricao={s.RESUMO_VIDA}
                            imagem={s.FOTO_PRINCIPAL}
                            categoria={s.CATEGORIA}
                        />

                    ))}

                </Carousel>

            </section>
            <div id="sobre">

                <Footer />
            </div>
        </div>
    );
}