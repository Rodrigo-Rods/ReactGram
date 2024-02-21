import "./Auth.css"

// Components
import { Link } from "react-router-dom"
import Message from "../../components/Message"

// Hooks
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// Redux


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return <div id="login">
        <h2>ForestGram</h2>
        <p className="subtitle">Faça login para ver o que há de novo!</p>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email || ''}
            />
            <input
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password || ''}
            />
            <input type="submit" value="Entrar" />
        </form>
        <p>Não tem uma conta? <Link to="/register">Clique aqui</Link></p>
    </div>;

};
export default Login