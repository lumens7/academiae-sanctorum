import { Link } from "react-router-dom";

export default function OracaoCard({ id, santoId, titulo, texto, nomeSanto }) {

  return (

    <Link to={`/santo/${santoId}/oracao/${id}`}>

      <div className="
       snap-start
        min-w-[260px]
        sm:min-w-[300px]
        lg:min-w-[340px]

        max-w-[260px]
        sm:max-w-[300px]
        lg:max-w-[340px]

        h-[240px]
        sm:h-[250px]
        lg:h-[240px]

        bg-white
        border-2
        border-[#1C2A3A]
        rounded

        p-5
        sm:p-6

        flex
        flex-col
        transition
        hover:shadow-xl
        hover:-translate-y-1
      ">

        <h3
          className="text-[#1C2A3A] mb-2 sm:mb-3"
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "1.4rem"
          }}
        >
          {titulo}
        </h3>

        <p className="text-[#3E3125] text-sm line-clamp-4">
          {texto}
        </p>

        <p className="text-[#B89B5E] text-sm mt-3">
          — {nomeSanto}
        </p>

      </div>

    </Link>

  );

}