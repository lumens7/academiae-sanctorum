import { useState, useEffect } from "react";

import Header from "../componentes/Header";
import Hero from "../componentes/Hero";
import Carousel from "../componentes/Carousel";
import SantoCard from "../componentes/SantoCard";
import OracaoCard from "../componentes/OracaoCard";
import NovenaCard from "../componentes/NovenaCard";
import SearchOverlay from "../componentes/SearchOverlay";
import Divider from "../componentes/Divider";
import Footer from "../componentes/Footer";
import { useSearch } from "../componentes/SearchProvider";

export default function Home() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [santos, setSantos] = useState([]);
  const [oracoes, setOracoes] = useState([]);
  const [novena, setNovena] = useState([]);
  const { searchTerm } = useSearch();

  const santosFiltrados = santos.filter(santo =>
    santo.NOME.toLowerCase().includes(
      searchTerm.toLowerCase()
    )
  );

  function gerarIdsAleatorios(max, quantidade) {

    const ids = new Set();

    while (ids.size < quantidade) {

      ids.add(Math.floor(Math.random() * max) + 1);

    }

    return Array.from(ids);

  }

  // =============================
  // CARREGAR SANTOS
  // =============================

  useEffect(() => {

    const carregarSantos = async () => {

      const MAX_ID = 10;
      const QUANTIDADE = 9;

      const santosEncontrados = [];
      const idsTestados = new Set();

      while (
        santosEncontrados.length < QUANTIDADE &&
        idsTestados.size < MAX_ID
      ) {

        const id = Math.floor(Math.random() * MAX_ID) + 1;

        if (idsTestados.has(id)) continue;

        idsTestados.add(id);

        try {

          const res = await fetch(`${API_URL}/api/santo/${id}`);

          if (!res.ok) continue;

          const data = await res.json();

          if (data?.ID) {

            santosEncontrados.push(data);

          }

        } catch (err) {

          console.error("Erro buscando santo:", err);

        }

      }

      setSantos(santosEncontrados);

    };

    carregarSantos();

  }, []);

  // =============================
  // CARREGAR ORAÇÕES
  // =============================

  useEffect(() => {

    const carregarOracoes = async () => {

      const MAX_ID = 12;
      const QUANTIDADE = 9;

      const lista = [];
      const idsTestados = new Set();

      while (
        lista.length < QUANTIDADE &&
        idsTestados.size < MAX_ID
      ) {

        const id = Math.floor(Math.random() * MAX_ID) + 1;

        if (idsTestados.has(id)) continue;

        idsTestados.add(id);

        try {

          const res = await fetch(
            `${API_URL}/api/santo/${id}/oracao`
          );

          if (!res.ok) continue;

          const data = await res.json();

          if (data?.data?.length > 0) {

            lista.push({
              ...data.data[0],
              santoId: id
            });

          }

        } catch (err) {

          console.error("Erro buscando oração:", err);

        }

      }

      setOracoes(lista);

    };

    carregarOracoes();

  }, []);

  useEffect(() => {

    const carregarNovena = async () => {

      try {

        // tenta novena do dia
        let res = await fetch(`${API_URL}/api/santo/day/novena`);

        if (res.ok) {

          const data = await res.json();

          if (data?.data?.length > 0) {

            setNovena({
              ...data.data[0],
              santoId: data.data[0].SANTO_ID ?? null
            });

            return;

          }

        }

        // fallback: busca qualquer novena existente
        for (let id = 1; id <= 20; id++) {

          res = await fetch(`${API_URL}/api/santo/${id}/novena`);

          if (!res.ok) continue;

          const data = await res.json();

          if (data?.data?.length > 0) {

            setNovena({
              ...data.data[0],
              santoId: id
            });

            return;

          }

        }

        setNovena(null);

      } catch (erro) {

        console.error("Erro carregando novena:", erro);
        setNovena(null);

      }

    };

    carregarNovena();

  }, []);

  return (
    <div className="min-h-screen bg-[#F4EFE6]">

      <Header />
      <SearchOverlay />

      <Hero />
      <h2 className="text-[#5B1E1E] text-center mt-12 text-2xl md:text-3xl lg:text-4xl"
        style={{
          fontFamily: "Cormorant Garamond"
        }}>
        A Comunhão dos Santos
      </h2>

      <p id="santos"
        className="text-center text-[#3E3125] max-w-[42em] px-8 mx-auto mt-6 text-base md:text-lg lg:text-xl leading-relaxed"
        style={{ fontFamily: "EB Garamond" }}
      >
        A Igreja não caminha sozinha. Aqueles que já contemplam a face de Deus permanecem unidos a nós na caridade e continuam intercedendo por todos os que buscam a vida eterna.

        Os santos foram homens e mulheres como nós. Enfrentaram dificuldades, dúvidas e sofrimentos, mas confiaram na graça divina e perseveraram. Hoje participam da glória do céu e continuam auxiliando aqueles que ainda percorrem o caminho da fé.
      </p>
      <Divider />
      <h2 
        className="text-[#5B1E1E] text-center mt-12 text-2xl md:text-3xl lg:text-4xl"
        style={{
          fontFamily: "Cormorant Garamond"
        }}>
        Santos da Igreja
      </h2>

      <div className="flex flex-col items-center mb-2">

        <p
          className="text-center italic text-[#3E3125] max-w-[50em] px-4 text-lg md:text-xl lg:text-2xl"
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          "Sede santos, porque eu, o Senhor vosso Deus, sou santo"
        </p>

      </div>


      <section className="py-16 max-w-[75em] mx-auto px-8">

        <Carousel>

          {santos?.map((santo) => (

            <SantoCard
              key={santo.ID}
              id={santo.ID}
              nome={santo.NOME}
              datas={santo.DATA_CANONIZACAO}
              descricao={santo.RESUMO_VIDA}
              imagem={santo.FOTO_PRINCIPAL}
              categoria={santo.CATEGORIA}
            />

          ))}

        </Carousel>

      </section>
      <h2 className="text-[#5B1E1E] text-center mt-12 text-2xl md:text-3xl lg:text-4xl"
        style={{
          fontFamily: "Cormorant Garamond"
        }}>
        A intercessão dos santos
      </h2>

      <p
        className="text-center text-[#3E3125] max-w-[42em] px-8 mx-auto mt-6 text-base md:text-lg lg:text-xl leading-relaxed"
        style={{ fontFamily: "EB Garamond" }}
      >
        Interceder é amar. Os santos não buscaram o céu apenas para si, mas desejaram que todos pudessem alcançá-lo. Mesmo após sua vida terrena continuam apresentando nossas necessidades diante de Deus.

        Santa Teresinha prometeu fazer cair uma “chuva de rosas” sobre a terra. Santa Mônica perseverou pela conversão de seu filho. São Francisco de Sales dedicou sua vida a conduzir almas a Cristo. Assim permanece viva a comunhão entre o céu e a terra.
      </p>
      <h2 className="text-[#5B1E1E] text-center mt-12 text-2xl md:text-3xl lg:text-4xl"
        style={{
          fontFamily: "Cormorant Garamond"
        }}>
        Exemplo de vida cristã
      </h2>

      <p
        className="text-center text-[#3E3125] max-w-[42em] px-8 mx-auto mt-6 text-base md:text-lg lg:text-xl leading-relaxed"
        style={{ fontFamily: "EB Garamond" }}
      >
        Antes de serem intercessores, os santos foram testemunhas. Em suas vidas encontramos caminhos concretos de fidelidade, esperança e perseverança.

        Cada história revela que seguir Cristo transforma o coração humano e conduz à verdadeira alegria que não passa.
      </p>
      <section id="oracoes" className="py-16 max-w-[75em] mx-auto px-8">
        <Divider />
        <h2 
          className="text-[#5B1E1E] text-center mt-12 text-2xl md:text-3xl lg:text-4xl"
          style={{
            fontFamily: "Cormorant Garamond"
          }}>
          Orações
        </h2>

        <div className="flex flex-col items-center mb-4">

          <p
            className="text-center italic text-[#3E3125] max-w-[50em] px-4 text-lg md:text-xl lg:text-2xl"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            "Vigiai e Orai, para não cairdes em tentação"
          </p>


        </div>

        <Carousel>
          {oracoes?.map((oracao) => {

            const santo = santos.find(s => s.ID === oracao.santoId);

            return (
              <OracaoCard
                key={oracao.ID}
                id={oracao.ID}
                santoId={oracao.santoId}
                titulo={oracao.TITULO}
                texto={oracao.TEXTO}
                nomeSanto={oracao.NOME}
              />
            );

          })}

        </Carousel>

      </section>
      <h2 className="text-[#5B1E1E] text-center mt-12 text-2xl md:text-3xl lg:text-4xl"
        style={{
          fontFamily: "Cormorant Garamond"
        }}>
        A santidade é um chamado para todos
      </h2>
      <p
        className="text-center text-[#3E3125] max-w-[42em] px-8 mx-auto mt-6 text-base md:text-lg lg:text-xl leading-relaxed"
        style={{ fontFamily: "EB Garamond" }}>
        A santidade não é reservada apenas a alguns, mas é um chamado dirigido a todos os que desejam responder ao amor de Deus. Muitos santos também enfrentaram dúvidas e fraquezas, mas confiaram na misericórdia divina e recomeçaram. Cada vida transformada pela graça se torna luz para outras almas.</p>
      <h2 className="text-[#5B1E1E] text-center mt-12 text-2xl md:text-3xl lg:text-4xl"
        style={{
          fontFamily: "Cormorant Garamond"
        }}>
        A força do testemunho dos santos
      </h2>
      <p
        className="text-center text-[#3E3125] max-w-[42em] px-8 mx-auto mt-6 text-base md:text-lg lg:text-xl leading-relaxed"
        style={{ fontFamily: "EB Garamond" }}>
        Os santos não ensinaram apenas com palavras, mas com suas próprias vidas. Antes de falarem de Deus, aprenderam com Ele. Antes de conduzirem outros, deixaram-se conduzir.Santa Maria Madalena, por exemplo, permaneceu fiel até a cruz e foi a primeira testemunha da Ressurreição. Santa Teresa d’Ávila desejava profundamente contemplar a Deus e fez desse desejo o centro de sua vida espiritual. São João Bosco dedicou sua missão à salvação das almas, mostrando que amar a Deus significa também cuidar das pessoas.O testemunho dos santos continua sendo um convite vivo para todos nós.</p>
      <section id="novena" className="py-16 max-w-[75em] mx-auto px-8">
        
          {novena && (
            <>
<div className="flex flex-col items-center mb-2">
          <Divider/>
          <h2 
            className="text-[#5B1E1E] text-center mt-12 text-2xl md:text-3xl lg:text-4xl"
            style={{
              fontFamily: "Cormorant Garamond"
            }}>
            Novena para Iniciar Hoje
          </h2>

        </div>
        <div className="flex justify-center">

            <NovenaCard
              titulo={novena.TITULO}
              texto={novena.TEXTO}
              nomeSanto={novena.NOME}
              id={novena.ID}
              santoId={novena.santoId}
              dataComemoracao={novena.DATA_CANONIZACAO}
            />

        </div>
        </>
          )}


      </section>
      <h2 className="text-[#5B1E1E] text-center mt-12 text-2xl md:text-3xl lg:text-4xl"
        style={{
          fontFamily: "Cormorant Garamond"
        }}>
        Caminhar com os santos rumo ao céu
      </h2>

      <p
        className="text-center text-[#3E3125] max-w-[42em] px-8 pb-8 mx-auto mt-6 text-base md:text-lg lg:text-xl leading-relaxed"
        style={{ fontFamily: "EB Garamond" }}>
        Ninguém caminha sozinho na vida espiritual. Aqueles que já contemplam a face de Deus continuam intercedendo por nós e sustentando nossa caminhada.

        Conhecer os santos é aprender com suas vidas, confiar em sua intercessão e renovar diariamente o desejo da santidade.
      </p>
      <div id="sobre">
        <Footer />
      </div>
    </div>
  );
}