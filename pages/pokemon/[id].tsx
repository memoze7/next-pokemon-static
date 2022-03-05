
import { useState } from 'react';


import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from "next/image";

import { Text, Grid, Card, Button, Container } from '@nextui-org/react';

import { Layout } from "../../components/layouts"
import { localFavorites } from "../../utils";
import { Pokemon } from '../../interfaces';

import pokeApi from '../../api/pokeApi';

import confetti from 'canvas-confetti'
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavoriter(!isInFavoriter)

    if (isInFavoriter) return
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }

  const [ isInFavoriter, setIsInFavoriter ] = useState<boolean>(localFavorites.existInFavorites(pokemon.id))




  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: "space-between", flexWrap: "wrap" }}>
              <Text h1 transform="capitalize">{pokemon.name}</Text>

              <Button
                ghost={!isInFavoriter}
                color={"gradient"} onClick={onToggleFavorite} >
                {isInFavoriter ? "En Favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0} justify="space-between">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [ ...Array(151) ].map((value, index) => `${index + 1}`)

  return {
    paths: pokemons151.map(id => ({
      params: { id }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string }

  return {
    props: {
      pokemon: await getPokemonInfo(id)
    }
  }
}
export default PokemonPage