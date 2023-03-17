import { ChangeEvent, useEffect, useState } from "react"


interface Pokemon {
  name: string,
  url: string
}

interface Event {
  value: string
}

export const Pokemons = () => {

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState({
    name: '',
    img: ''
  });

  const onInputChange = ({ target }: ChangeEvent<Event>) => {
    setInputValue(target.value)    
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim().length <= 1) return

    useFetch();    
    setIsLoading(false)

    setInputValue('')
  }

  const useFetch = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
            .then(resp => resp.json())
            .then(pokemon => {
              setPokemon({
                name: pokemon.name,
                img: pokemon.sprites.front_default
              })
            })            
      
  }


  return (
    <>    
      <form onSubmit={onSubmit}>
        <input
          type="text"          
          value={inputValue}
          onChange={onInputChange}
        />
      </form>

      {
        isLoading === true
        ?
          <div>Cargando...</div>
        :
          <img src={pokemon.img} alt={pokemon.name} />
      }
    
    </>

  )
}
