/*
  Dynamic routing:
    Nome de arquivo entre colchetes;
    Utiliza-se do useRouter para pegar a rota de acesso ;
    getStaticPaths é requerido para páginas dinâmicas SSG;
*/


import { GetStaticPaths, GetStaticProps } from 'next'
import { usePlayer } from 'context/Player.Context'
import Image from 'next/image'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { convertDurationToTimeString } from 'conertDurationToTimeString'
import ptBr from 'date-fns/locale/pt-BR'
import api from 'services/api';
import styles from './episode.module.scss'


type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  duration: number
  durationAsString: string
  publishedAt: string
  url: string
  description: string
}

type EpisodeProps = {
  episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
  const { play } = usePlayer()

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
        <Image 
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />

    </div>
  )
}

// Gera as páginas estáticas. Somente as passadas no paths
// Recomenda-se passar nos path apenas as pages mais acessadas (tempo de build)
export const getStaticPaths: GetStaticPaths = async() => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const paths = data.map(episode => {
    return {
      params : {
        slug: episode.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking' // false -> carrega somente se passar os paths;
                         // true -> o carregamento das pages ocorrem no lado cliente (Necessita useRouter)
                         // blocking -> utliza a camada do server do next para carregar a page (SEO; caso não haja pages gerada estaticas)
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params

  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM, yy', {
      locale: ptBr
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
