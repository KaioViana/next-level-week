/* ESTE COMPONENTE ABRAÇA TODA A PÁGINA
   SEMPRE É EXECUTADO QUANDO OCORRE UMA INTERAÇÃO
   DO USUÁRIO   
*/
import '../styles/global.css'


function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
