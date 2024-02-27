import './Profile.css'
import { uploads } from '../../utils/config'

//Components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'

//Hooks
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

//Redux
import { getUserDetails } from '../../slices/userSlice'
import { getUserPhotos, publishPhoto, resetMessage } from '../../slices/photoSlice'

const Profile = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user, loading } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)
    const {
        photos,
        loading: loadingPhoto,
        message: messagePhoto,
        error: errorPhoto
    } = useSelector((state) => state.photo);

    //Photos
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')

    //Form e form refs
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    //Carregar dados usuário
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id))
    }, [dispatch, id]);

    const handleFile = (e) => {
        const image = e.target.files[0];

        setImage(image)
    };

    const submitHandle = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image
        }

        //Montar dados do form
        const formData = new FormData();

        const photoFormData = Object.keys(photoData).forEach((key) =>
            formData.append(key, photoData[key])
        );

        formData.append("photo", photoFormData)

        dispatch(publishPhoto(formData))

        setTitle('')

        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return <div id='profile'>
        <div className='profile-header'>
            {user.profileImage && (
                <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
            )}
            <div className="profile-description">
                <h2>{user.name}</h2>
                <p>{user.bio}</p>
            </div>
        </div>
        {id === userAuth._id && (
            <>
                <div className="new-photo" ref={newPhotoForm}>
                    <h3>Compartilhe suas fotos!</h3>
                    <form onSubmit={submitHandle}>
                        <label >
                            <span>Titulo para a foto:</span>
                            <input
                                type="text"
                                placeholder='Insira um titulo:'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title || ''}
                            />
                        </label>
                        <label>
                            <span>Imagem:</span>
                            <input type="file" onChange={handleFile} />
                        </label>
                        {!loadingPhoto && <input type="submit" value="Postar" />}
                        {loadingPhoto && <input type="submit" disabled value="Aguarde..." />}
                    </form>
                </div>
                {errorPhoto && <Message type='error' msg={errorPhoto} />}
                {messagePhoto && <Message type='sucess' msg={messagePhoto} />}
            </>
        )}
        <div className='user-photos'>
            <h2>Fotos publicadas:</h2>
            <div className="photos-container">
                {photos && photos.map((photo) => (
                    <div className="photo" key={photo._id}>
                        {photo.image && (
                            <img
                                src={`${uploads}/photos/${photo.image}`}
                                alt={photo.title}
                            />
                        )}
                        {id === userAuth._id ? (
                            <div className="actions">
                                <Link to={`photos/${photos._id}`}>
                                    <BsFillEyeFill />
                                </Link>
                                <BsPencilFill />
                                <BsXLg />
                            </div>
                        ) : (<Link className="btn" to={`photos/${photos._id}`}>Ver</Link>)}
                    </div>
                ))}
                {photos.length === 0 && <p>Nenhuma foto publicada ainda...</p>}
            </div>
        </div>
    </div>
}

export default Profile