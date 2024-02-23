import './EditProfile.css';
import { uploads } from '../../utils/config';

//Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux
import { profile, resetMessage } from '../../slices/userSlice';

//Componentes
import Message from '../../components/Message';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { user, message, error, loading } = useSelector((state) => state.user);

    //States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [bio, setBio] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    //Load user Data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    // Completar o form
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user])

    // console.log("User:", user)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleFile = (e) => {
        // Preview
        const image = e.target.files[0];

        setPreviewImage(image)

        //Update State
        setProfileImage(image)
    }


    return <div id='edit-profile'>
        <h2>Edite seu perfil</h2>
        <p className='subtitle'> Adicione uma imagem de perfil e conte mais sobre você...</p>
        {(user.profileImage || previewImage) && (
            <img
                className='profile-image'
                src={
                    previewImage
                        ? URL.createObjectURL(previewImage)
                        : `${uploads}/users/${user.profileImage}`
                }
                alt={user.name}
            />
        )}
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ''} />
            <input type="email" placeholder='E-mail' disabled value={email || ''} />
            <label>
                <span>Image do Perfil</span>
                <input type="file" onChange={handleFile} />
            </label>
            <label>
                <span>Bio:</span>
                <input type="text" placeholder='Descrição do perfil' onChange={(e) => setBio(e.target.value)} value={bio || ''} />
            </label>
            <label>
                <span>Quer alterar sua senha?</span>
                <input type="password" placeholder='Digite sua nova senha' onChange={(e) => setPassword(e.target.value)} value={password || ''} />
            </label>
            <input type="submit" value="Atualizar" />
        </form>
    </div>
}

export default EditProfile