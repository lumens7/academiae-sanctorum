import { useSearch } from "./SearchProvider";
import { Link } from "react-router-dom";

export default function SearchOverlay() {

    const { results, searchTerm, setSearchTerm } = useSearch();

    if (!searchTerm || results.length === 0) return null;

    return (

        <div className="
            fixed
            top-[7rem]
            md:top-[5rem]
            left-0
            w-full
            z-[999]
            ">

            <div className="bg-[#F4EFE6] shadow-2xl border-t border-[#B89B5E]/40">

                <div className="max-w-[1200px] mx-auto px-6 py-6">

                    <h2 className="mb-4 text-[#5B1E1E] font-semibold">
                        Resultados para "{searchTerm}"
                    </h2>

                    <div className="grid gap-3">

                        {results.map(item => (

                            <Link
                                key={`${item.tipo}-${item.ID}`}
                                to={item.link}
                                onClick={() => setSearchTerm("")}
                                className="block p-4 rounded bg-white hover:bg-[#F0E8D8] transition"
                            >

                                <span className="font-semibold">
                                    {item.titulo}
                                </span>

                                <span className="ml-3 text-sm text-[#777]">
                                    ({item.tipo})
                                </span>

                            </Link>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}