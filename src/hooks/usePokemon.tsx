import { useEffect, useState } from "react"


interface Pokemon {
    id: number,
    imageUrl: string,
    name: string
}

interface Props {
    id: number
}

export const usePokemon = ({ id }: Props) => {

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getPokemonById = async (id: number) => {
        setIsLoading(true);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        setPokemon({
            id: id,
            name: data.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        });

        setIsLoading(false);
    };

    // ni promesas y ni metodo asincrono pueden ir en un useEffect
    useEffect(() => {

        getPokemonById(id);
    }, [id]);


    return {
        // properties
        pokemon,
        isLoading,
        // methods
        formatedId: id.toString().padStart(3, '0'),
    }
}
