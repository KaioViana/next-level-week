import { FormEvent, useContext, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../context/auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'


function SendMessageForm() {
  const [message, setMessage] = useState<string>('')

  const { user, signOut } = useContext(AuthContext)

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault()

    if(!message.trim()) {
      return
    }

    await api.post('messages', { message })

    setMessage('')
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32"/>
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.nome} />
        </div>
        <strong className={styles.userName}>{user?.nome}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>
      
      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Menssagem</label>
        <textarea 
          name="message" 
          id="message"
          placeholder="Qual a sua expectativa para o doWhile 2021?"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}

export { SendMessageForm }
