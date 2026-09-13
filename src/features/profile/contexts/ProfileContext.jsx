/* eslint-disable react-refresh/only-export-components */
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from '@/features/auth/contexts/AuthContext.jsx';
import { userService } from '@features/user/service/userService.js'

const ProfileContext = createContext();

export function ProfileProvider({ children }) {

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({})
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null);
    const { isAuth } = useAuthContext()

    const fetchData = async () => {
        nprogress.start();
        setLoading(true)
        setError(null)
        try {
            const response = await userService.getMyProfile();
            setProfile(response)
            setSuccess(true)
            return response.data
        } catch (err) {
            console.error("Error de carga de API", err);
            setError("No se realizo ninguna accion.")
            throw err;
        } finally {
            setLoading(false)
            setSuccess(false)
            nprogress.done();
        }
    }


    const updateImage = async (selectedFile) => {
        if (!selectedFile) return alert("Por favor selecciona un archivo");

        try {
            // Aquí llamas a tu función imageUpload del servicio
            setLoading(true)
            setError(null)
            nprogress.start();
            await userService.imageUploadProfile(selectedFile);
            toast.success("Imagen subida con éxito");
            fetchData();
        } catch (err) {
            alert("Error al subir: " + error.message);
            setError(err.message);
            throw err
        } finally {
            setLoading(false)
        }
    }

    const updatePerfil = async (data=null) => {
        nprogress.start();
        setLoading(true)
        setError(null)
        try {
            await userService.updateMyProfile({...profile, ...data});
            toast.success("Se actualizo profile!");
            setSuccess(true)
        } catch (err) {
            console.error("Error de carga de API", err);
            setError("No se realizo ninguna accion.")
            toast.error("Error No se realizo ninguna accion.");
        } finally {
            setLoading(false)
            nprogress.done();
        }
    }

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;
        setProfile({ ...profile, [name]: val });
    };

    useEffect(() => {
        fetchData()
    }, [isAuth])

    return (
        <ProfileContext.Provider
            value={{ 
                fetchData, profile, loading, handleChange, updatePerfil, updateImage,
                error, setError, success, setSuccess
                }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => useContext(ProfileContext);
