import { Link } from "react-router-dom";

export default function NovenaCard({
  id,
  santoId,
  titulo,
  texto,
  nomeSanto,
  dataComemoracao
}) {

  function formatarData(data) {
    if (!data) return "";

    const d = new Date(data);

    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");

    return `${dia}/${mes}`;
  }

  return (

    <Link to={`/santo/${santoId}/novena/${id}`}>

      <div className="
        snap-start

        min-w-[260px]
        sm:min-w-[300px]
        lg:min-w-[420px]

        max-w-[260px]
        sm:max-w-[300px]
        lg:max-w-[600px]

        h-[260px]
        sm:h-[280px]

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

        <div className="p-5 sm:p-6 flex flex-col gap-3 h-full">

          <h2
            className="text-[#1C2A3A]"
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "1.4rem",
              fontWeight: 700
            }}
          >
            {titulo}
          </h2>

          <p className="text-[#3E3125] text-sm line-clamp-4">
            {texto}
          </p>

          <div className="mt-auto">

            <p className="text-[#B89B5E] text-sm">
              Em honra a {nomeSanto}
            </p>

            <p className="text-[#1C2A3A] text-xs">
              comemorada em {formatarData(dataComemoracao)}
            </p>

          </div>

        </div>

      </div>

    </Link>

  );

}