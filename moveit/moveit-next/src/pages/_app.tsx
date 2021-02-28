/* ESTE COMPONENTE ABRAÇA TODA A PÁGINA
   SEMPRE É EXECUTADO QUANDO OCORRE UMA INTERAÇÃO
   DO USUÁRIO   
*/

import { ChallengesProvider } from '../contexts/ChallengesContext'
import '../styles/global.css'


function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
    
  )
}

export default MyApp
