import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {
    const { user } = useSelector((state) => state.auth);

    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true); // Se o usuário der um refresh na pagina, mantém o loading true até verificar o usuário

    useEffect(() => {

        if (user) {
            setAuth(true);

        } else {
            setAuth(false);
        }

        setLoading(false);
    }, [user])

    return { auth, loading }
};