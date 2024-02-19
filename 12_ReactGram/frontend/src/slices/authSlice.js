import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const user = JSON.parce(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    error: false,
    sucess: false,
    loading: false,
};

// Registro de usuário
export const register = createAsyncThunk("auth/register",
    async (user, thunkAPI) => {

        const data = await authService.register(user);

        //Checar se a resposta é um erro
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error[0]);
        }
        return data;
    }
)