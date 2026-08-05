import { useEffect, useState } from "react";
import axios from "axios";

const speciesTheme = {
    Human: {
        ring: "ring-blue-400/40",
        glow: "hover:shadow-blue-500/30",
        badge: "bg-blue-500/20 text-blue-300 border-blue-400/40",
        bar: "from-blue-500 to-blue-700",
    },
    Droid: {
        ring: "ring-slate-300/40",
        glow: "hover:shadow-slate-300/30",
        badge: "bg-slate-400/20 text-slate-200 border-slate-300/40",
        bar: "from-slate-400 to-slate-600",
    },
    Wookiee: {
        ring: "ring-amber-400/40",
        glow: "hover:shadow-amber-500/30",
        badge: "bg-amber-500/20 text-amber-300 border-amber-400/40",
        bar: "from-amber-500 to-amber-700",
    },
};

function Field({ label, value }) {
    return (
        <div>
            <dt className="text-neutral-500 text-xs uppercase mb-1">{label}</dt>
            <dd className="text-neutral-200">{value}</dd>
        </div>
    );
}

function CharacterCard({ character, onOpen }) {
    const theme = speciesTheme[character.species] || speciesTheme.Human;

    return (
        <button
            onClick={() => onOpen(character)}
            className={`rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 ring-1 ${theme.ring} ${theme.glow} transition hover:scale-105`}
        >
            <img src={`https://picsum.photos/400/300?random=${character.id}`} alt={character.name} className="w-full h-44 object-cover" />

            <div className="p-5">
                <span className={`px-2 py-1 rounded-full text-xs border ${theme.badge}`}>{character.species}</span>

                <h2 className="text-xl font-bold mt-3">{character.name}</h2>

                <p className="text-neutral-400 mt-1">{character.homeworld}</p>

                <div className="flex gap-4 mt-4 text-sm text-neutral-400">
                    <span>{character.height} cm</span>
                    <span>{character.mass} kg</span>
                </div>
            </div>
        </button>
    );
}

function CharacterModal({ character, onClose }) {
    if (!character) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-neutral-900 rounded-2xl overflow-hidden max-w-md w-full">
                <img src={`https://picsum.photos/400/300?random=${character.id}`} alt={character.name} className="w-full h-52 object-cover" />

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-5">{character.name}</h2>

                    <dl className="grid grid-cols-2 gap-4">
                        <Field label="Species" value={character.species} />
                        <Field label="Height" value={`${character.height} cm`} />
                        <Field label="Mass" value={`${character.mass} kg`} />
                        <Field label="Birth Year" value={character.birthYear} />
                        <Field label="Films" value={character.films} />
                        <Field label="Homeworld" value={character.homeworld} />
                    </dl>

                    <button onClick={onClose} className="mt-6 w-full bg-yellow-500 text-black py-2 rounded-lg">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    const [characters, setCharacters] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCharacters();
    }, []);

    async function fetchCharacters() {
        try {
            setLoading(true);

            const { data } = await axios.get("https://swapi.info/api/people");

            const charactersData = await Promise.all(
                data.map(async (item, index) => {
                    let species = "Human";

                    if (item.species.length > 0) {
                        try {
                            const speciesRes = await axios.get(item.species[0]);
                            species = speciesRes.data.name;
                        } catch {}
                    }

                    let homeworld = "Unknown";

                    try {
                        const planetRes = await axios.get(item.homeworld);
                        homeworld = planetRes.data.name;
                    } catch {}

                    return {
                        id: index + 1,
                        name: item.name,
                        species,
                        height: item.height,
                        mass: item.mass,
                        birthYear: item.birth_year,
                        films: item.films.length,
                        homeworld,
                    };
                }),
            );

            setCharacters(charactersData);
        } catch {
            setError("Failed to fetch characters.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-4">
                <p>{error}</p>
                <button onClick={fetchCharacters} className="bg-yellow-500 text-black px-5 py-2 rounded-lg">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <header className="py-8 text-center">
                <h1 className="text-4xl font-bold text-yellow-400">Star Wars </h1>
            </header>

            <main className="max-w-6xl mx-auto px-6 pb-10">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {characters.map((character) => (
                        <CharacterCard key={character.id} character={character} onOpen={setSelected} />
                    ))}
                </div>
            </main>

            <CharacterModal character={selected} onClose={() => setSelected(null)} />
        </div>
    );
}
