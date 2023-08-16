
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './loginUsuario.css';
import { isValidPassword } from '../validaciones';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginUsuario = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
 // const [performValidations, setPerformValidations] = useState(true); // Estado para controlar las validaciones
  const navigate = useNavigate();

  const [token, setToken] = useState('');

// Guardar un token en el localStorage después de un inicio de sesión exitoso
const handleWindow =  () => {
    // Guarda el token en localStorage

  // navigate('/home');
};




// Recuperar un token del localStorage en otro componente
//const authToken = localStorage.getItem('authToken');

  const onSubmit = async (formData) => {
    if (!formData.email || !formData.contraseña) {
      setErrorMessage('Todos los campos son requeridos');
      return;
    }
    console.log('formState', formData)

    try {
      const response = await axios.post('http://localhost:3001/psiconection/login', formData);
      // console.log(response.data.info.tokenSessionUser)
      // console.log('Response from server:', response.data);
      // console.log('Token:', response.data.info.tokenSessionUser);
      if (response.status === 200) {
        const userRole = response.data.info.roll;
          console.log("roll",userRole)
        if (userRole === 'psicologo') {
          // Si el rol es diferente psicologo, muestra un mensaje y no realiza la redirección
          window.alert('Por favor inicie sesión como usuario');
        } else {
          const token = response.data.info.tokenSessionUser
          // setToken(token);
          localStorage.setItem('authToken', JSON.stringify(token));
          navigate('/home')

        }
        
     }    
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      window.alert(error.response.data.error);
      
    }
  };

  console.log('formToken',token)


  const onGoogleSignIn = () => {
    // Redirigir al flujo de inicio de sesión de Auth0 con Google como proveedor
    window.location.href = 'URL_DE_INICIO_DE_SESION_DE_AUTH0';
  };

  return (
    <div className="containerLoginUsuario">
    
      <div className="login-formUsu">
        <h2>¡Bienvenidos Usuarios!</h2>
        <h3>Para ingresar a nuestra comunidad, inicia sesión:</h3>

{/* //! Botón de inicio de sesión con Google */}
        <div className="google-login-button">
          <button
            className="g-signin2"
            onClick={onGoogleSignIn}
            >
        <i class='bx bxl-google bx-burst' ></i> 
          </button>
  <h4>Inicia sesión con Google</h4>
        </div>

        {/* Formulario de inicio de sesión local */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="login-formUsu">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-groupUsu">
            <label>
              <i className="bx bxs-envelope"></i>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i }}
                render={({ field }) => (
                  <input
                  {...field}
                  type="email"
                  placeholder="Email del Usuario"
                  />
                  )}
                  />
            </label>
            {errors.email?.type === 'pattern' && (
              <p className='errores'>Formato de email incorrecto</p>
              )}

            <label>
              <i className="bx bxs-lock-alt"></i>
              <Controller
                name="contraseña"
                control={control}
                defaultValue=""
                rules={{ validate: isValidPassword }}
                render={({ field }) => (
                  <div className="password-input">
                  <input
                    {...field}
                    type={showPassword ? 'text' : 'password'} // Cambio de tipo aquí
                    placeholder="Contraseña"
                    />
      
                  <i
                    className={`bx ${showPassword ? 'bxs-hide' : 'bxs-show'}`}
                    onClick={() => setShowPassword(!showPassword)}
                    ></i>
                </div>
              )}
              />
            </label>
            {errors.password && (
              <p className='errores'>Debe tener más de 6 caracteres alfanuméricos</p>
              )}
          </div>
          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>

{/* Enlace para ir a la página de registro */}
<div className="register-link">
          ¿No tienes una cuenta?{' '}
          <Link to="/registroUsuario" className="register-link-text">
            Regístrate aquí
          </Link>
          </div>         
{/* //! Volver a la pagina de selección roll */}
                <div className="link-back">
                  {/* Enlace para volver a la página anterior */}
                  <Link to="/form" className="back-link">Volver</Link>
                  </div>
         </div>
              </form>
              </div>
              
              </div>
   
    
  );
}

export default LoginUsuario;

