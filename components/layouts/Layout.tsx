import { FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui/Navbar';
import { useRouter } from 'next/router';

interface Props {
  title?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {


  return (

    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Guillermo Perez' />
        <meta name='description' content={`Information sobre el pokémon ${title}`} />
        <meta name='keywords' content={`${title} pokemon, pokedex`} />

        <meta property="og:title" content={`Informacion sober ${title}`} />
        <meta property="og:description" content={`Esta es la página sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>
      <Navbar />
      <main style={{ padding: "0 20px" }}>
        {children}
      </main>
    </>
  )
}
