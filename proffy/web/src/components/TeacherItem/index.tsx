import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css'


function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/44887187?s=460&u=8b3c7edf51df6abb6f8ed86a8a91d30605bfc5fc&v=4" alt="Kaio César"/>
                    <div>
                        <strong>Kaio César</strong>
                        <span>Física</span>
                    </div>
            </header>

                <p>
                    Entusiasta das melhores tecnologias em física avançada.
                    <br/><br/>
                    Fera em física quântica. Um lugar onde tudo faz sentido mesmo sem fazer sentido algum. Como a minha vida.
                </p>
                <footer>
                    <p>
                        Preço/hora
                        <strong>R$ 100,00</strong>
                    </p>
                        <button type="button">
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entrar em contato.
                        </button>
                </footer>
        </article>
    )
}

export default TeacherItem;