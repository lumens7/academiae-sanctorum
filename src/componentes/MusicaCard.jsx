import { Music } from "lucide-react";

export default function MusicaCard({ nome, letra, link }) {

  return (

    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >

      <div
        className="
          snap-start

          min-w-[260px]
          sm:min-w-[300px]
          lg:min-w-[340px]

          max-w-[260px]
          sm:max-w-[300px]
          lg:max-w-[340px]

          h-[240px]
          sm:h-[250px]
          lg:h-[260px]

          bg-white
          border-2 border-[#1C2A3A]
          rounded

          p-5 sm:p-6

          flex flex-col justify-between

          transition
          hover:shadow-xl
          hover:-translate-y-1
        "
      >

        {/* TOPO */}

        <div>

          <div className="flex items-start gap-3">

            <Music
              size={24}
              className="text-[#B89B5E] mt-1 shrink-0"
            />

            <h3
              className="text-[#1C2A3A]"
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "1.4rem"
              }}
            >
              {nome}
            </h3>

          </div>

          {/* TRECHO DA LETRA */}

          <p
            className="
              text-[#3E3125]
              text-sm
              mt-3
              line-clamp-3
            "
            style={{
              fontFamily: "EB Garamond"
            }}
          >
            {letra}
          </p>

        </div>


        {/* BOTÃO */}

        <div
          className="
            inline-block

            px-6 py-3

            bg-[#1C2A3A]
            text-white

            border border-[#B89B5E]
            rounded

            text-center

            hover:bg-[#152231]

            transition-all
          "
          style={{
            fontFamily: "EB Garamond",
            fontWeight: 600
          }}
        >
          ▶ Ouvir no YouTube
        </div>

      </div>

    </a>

  );

}