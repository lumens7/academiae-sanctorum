import { Link } from "react-router-dom";

export default function SantoCard({ id, nome, datas, descricao, imagem, categoria}) {
 
  function formatarData(data) {
  if (!data) return "";

  const d = new Date(data);

  const dia = String(d.getUTCDate()).padStart(2, "0");
  const mes = String(d.getUTCMonth() + 1).padStart(2, "0");

  return `${dia}/${mes}`;
}

  return (

    <div className="min-w-[260px] sm:min-w-[300px] lg:min-w-[340px] flex justify-center snap-start">

      <div className="
        w-[340px]
        h-auto
        bg-white
        rounded-[6px]
        border-2
        border-[#1C2A3A]
        overflow-hidden
        transition-all
        duration-300
        hover:shadow-2xl
        hover:-translate-y-2
      ">

        <div className="relative h-[220px] sm:h-[260px] lg:h-[320px] overflow-hidden bg-[#F4EFE6]">

          <img
            src={imagem || "/placeholder.png"}
            alt={nome}
            className="
              w-full
              h-auto
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />
          <div className="absolute top-4 right-4 bg-[#1C2A3A] px-3 py-1 rounded-full">
          <span className="text-[#B89B5E]" style={{ fontFamily: 'EB Garamond', fontSize: '12px', fontWeight: 600 }}>
            {categoria.toUpperCase()}
          </span>
        </div>

        </div>

        <div className="p-6 flex flex-col gap-3 min-h-[260px]">

          <h3
            className="text-[#1C2A3A] text-xl sm:text-2xl"
            style={{
              fontFamily: "Cormorant Garamond",
              fontWeight: 700
            }}
          >
            {nome}
          </h3>

          <p className="text-[#B89B5E] text-sm">
            {formatarData(datas)}
          </p>

          <p className="text-[#3E3125] text-sm sm:text-base line-clamp-4 leading-relaxed">
            {descricao}
          </p>

          <Link
            to={`/santo/${id}`}
            className="
              mt-auto
              text-center
              bg-[#1C2A3A]
              text-white
              px-4
              py-2
              rounded-md shadow-sm hover:shadow-md
              hover:bg-[#152231]
              transition
            "
          >
            Ver Vida Completa
          </Link>

        </div>

      </div>

    </div>
  );
}