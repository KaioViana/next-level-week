import { useContext } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../context/auth'
import styles from './styles.module.scss'


function LoginBox() {
  const { signInUrl } = useContext(AuthContext)

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size="24"/>
        Entrar com o github
      </a>
    </div>
  )
}

export { LoginBox }
