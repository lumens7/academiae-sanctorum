import { useRef } from "react";

export default function Carousel({ children }) {

  const scrollRef = useRef(null);

  function scrollLeft() {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  }

  function scrollRight() {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  }

  return (

    <div className="relative w-full group">

      {/* botão esquerda */}
      <button
        onClick={scrollLeft}
        className="
          hidden md:flex
          absolute left-2 top-1/2 -translate-y-1/2
          z-10

          w-12 h-12
          items-center justify-center

          bg-[#F4EFE6]/95
          border border-[#B89B5E]
          rounded-full

          shadow-md
          backdrop-blur-sm

          opacity-0
          group-hover:opacity-100

          transition
          duration-300
          hover:bg-[#1C2A3A]
          hover:scale-105
        "
      >
        <span
          className="
            text-[#1C2A3A]
            text-xl
            font-semibold
            transition
            group-hover:text-black
          "
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          ‹
        </span>
      </button>


      {/* conteúdo scrollável */}

      <div
        ref={scrollRef}
        className="
          flex
          gap-6
          px-6
          overflow-x-auto
          pb-6
          scroll-smooth
          scrollbar-hide

          snap-x
          snap-proximity
        "
      >
        {children}
      </div>


      {/* botão direita */}

      <button
        onClick={scrollRight}
        className="
          hidden md:flex
          absolute right-2 top-1/2 -translate-y-1/2
          z-10

          w-12 h-12
          items-center justify-center

          bg-[#F4EFE6]/95
          border border-[#B89B5E]
          rounded-full

          shadow-md
          backdrop-blur-sm

          opacity-0
          group-hover:opacity-100

          transition
          duration-300
          hover:bg-[#1C2A3A]
          hover:scale-105
        "
      >
        <span
          className="
            text-[#1C2A3A]
            text-xl
            font-semibold
            transition
            group-hover:text-black
          "
          style={{ fontFamily: "Cormorant Garamond" }}
        >
          ›
        </span>
      </button>

    </div>

  );

}