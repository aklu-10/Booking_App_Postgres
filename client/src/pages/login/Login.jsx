import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const { loading, error, dispatch } = useContext(AuthContext);


    const handleCredentialsChange = (e) => {
        let {name, value} = e.target;
        setCredentials(pre=>({...pre, [name]: value}));
    }

    console.log(credentials)
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({type: 'LOGIN_START'});
        try{
            let { data } = await axios.post(`http://localhost:4000/api/auth/login`, credentials)
            dispatch({type: 'LOGIN_SUCCESS', payload: data})
            if(data?.[0].isadmin)
                navigate('/admin')
            else
                navigate('/')

        } catch (err){
            dispatch({type: 'LOGIN_FAILURE', payload: err.response.data})
        }
    }

    const navigate = useNavigate();

    useEffect(() => {

        (async () => {


            // try {
            //     let { data, status } = await axios.get(`http://localhost:4000/api/hotels/${window.location.pathname.split('/').slice(-1)[0]}`)
            //     if (status === 200)
            //         setHotel(data[0]);
            //     setPhotos(data[0].photos)
            // } catch (err) {
            //     setHotel(null);
            //     setPhotos([])
            // }

        })();

    }, []);


    return (
        <div class="login-container">
            <h2>Login</h2>
            <form>
                <div class="input-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required onChange={handleCredentialsChange}/>
                </div>
                <div class="input-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required onChange={handleCredentialsChange}/>
                </div>
                <p>{JSON.stringify(error)}</p>
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login