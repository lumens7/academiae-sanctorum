import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [santo, setSanto] = useState(null);

  useEffect(() => {

    fetch(`${API_URL}/api/santo/day`)
      .then(res => {
        if (!res.ok) {
          return fetch(`${API_URL}/api/santo/3`);
        }
        return res;
      })
      .then(res => res.json())
      .then(data => setSanto(data));

  }, []);

  return (

    <section
      className="relative min-h-[80vh] md:h-screen overflow-hidden"
      style={{
        backgroundImage:
          "url(https://blog.archtrends.com/wp-content/uploads/2025/05/basilicadesaopedroabre-1200x900.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      <div className="absolute inset-0 bg-[#F4EFE6]/75"></div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center md:items-center justify-between gap-12 md:gap-10 py-12 md:py-0 h-full">

        {/* TEXTO */}

        <div className="w-full md:w-1/2 text-center md:text-left">

          <div className="inline-block px-4 py-2 bg-[#1C2A3A] rounded-full mb-4">

            <span
              className="text-[#B89B5E] text-sm md:text-base"
              style={{
                fontFamily: "EB Garamond",
                fontWeight: 600,
                letterSpacing: "1px"
              }}
            >

              BEM-VINDO

            </span>

          </div>

          <h1
            className="text-[#5B1E1E] mb-6 text-3xl md:text-5xl"
            style={{
              fontFamily: "Cormorant Garamond",
              fontWeight: 700,
              lineHeight: "1.2"
            }}
          >

            {santo ? santo.NOME : "Vida dos Santos"}

          </h1>

          <p
            className="text-[#3E3125] mb-8 max-w-[90%] md:max-w-[540px] mx-auto md:mx-0 text-lg md:text-2xl"
            style={{
              fontFamily: "EB Garamond",
              lineHeight: "1.7",
              fontWeight: 700
            }}
          >

            {santo
              ? santo.RESUMO_VIDA
              : "Descubra a história de santidade daqueles que marcaram a Igreja."}

          </p>

          {santo && (

            <Link
              to={`/santo/${santo.ID}`}
              className="inline-block px-6 md:px-8 py-3 bg-[#1C2A3A] text-white rounded border-2 border-[#B89B5E] hover:bg-[#152231] transition-all shadow-lg hover:shadow-xl"
              style={{
                fontFamily: "EB Garamond",
                fontSize: "1rem",
                fontWeight: 600
              }}
            >

              Conhecer Santo

            </Link>

          )}

        </div>


        {/* IMAGEM */}

        <div className="w-full md:w-1/2 flex justify-center items-center">

          <div className="relative">

            <div className="absolute -inset-4 bg-[#1C2A3A]/10 rounded-lg blur-xl"></div>

            <div className="relative w-[18em] h-[22em] md:w-[28em] md:h-[32em] lg:w-[32em] lg:h-[35em] rounded-lg border-4 border-[#1C2A3A] overflow-hidden shadow-2xl bg-white">

              {santo?.FOTO_PRINCIPAL && (

                <img
                  src={santo.FOTO_PRINCIPAL}
                  alt={santo.NOME}
                  className="w-full h-full object-cover opacity-0 scale-110 animate-[fadeZoom_1.2s_ease-out_forwards]"
                />

              )}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}