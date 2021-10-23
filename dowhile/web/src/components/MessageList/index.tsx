import { api } from '../../services/api'
import io from 'socket.io-client'
import logoImg from '../../assets/logo.svg'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'


type Data = {
  id: string,
  text: string,
  user: {
    name: string,
    avatar_url: string
  }
}


const messagesQueue: Data[] = []

const socket = io('http://localhost:4000')

socket.on('new_message', (newMessage: Data) => {
  messagesQueue.push(newMessage)
})

function MessageList() {
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setData( prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean))

        messagesQueue.shift()
      }
    }, 3000)
  }, [])

  useEffect(() => {
    api.get<Data[]>('messages/last-three').then(response => {
      setData(response.data)
    })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="doWhile 2021" />

      <ul className={styles.messageList}>
        {
          data.map(item => {
            return (
              <li key={Math.random()} className={styles.message}>
                <p className={styles.messageContent}>{item.text}</p>
                <div className={styles.messageUser}>
                  <div className={styles.userImage}>
                    <img src={item.user.avatar_url} alt="Kaio Viana" />
                  </div>
                  <span>{item.user.name}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export { MessageList }
