import { Cross } from "lucide-react";

export default function Footer() {

  return (

    <footer className="bg-[#5B1E1E] py-8">

      <div className="text-center px-6">

        <Cross
          className="w-6 h-6 text-[#B89B5E] mx-auto mb-3"
          strokeWidth={1}
        />

        {/* <div className="flex flex-col md:flex-row gap-4 justify-center text-white text-sm md:text-base mb-3">

          <a href="#" className="hover:text-[#B89B5E]">

            Política de Privacidade

          </a>

          <a href="#" className="hover:text-[#B89B5E]">

            Termos de Uso

          </a>

          <a href="#" className="hover:text-[#B89B5E]">

            Contato

          </a>

        </div> */}

        <p className="text-white/60 text-xs md:text-sm">

          © 2026 Vida dos Santos. Todos os direitos reservados.

        </p>

      </div>

    </footer>

  );

}