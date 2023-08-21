//importamos el logo
import logo from "../../Images/Screenshot_15.jpg"
//importamos el estilo s
import s from "../landing/landing.module.css"
//importamos componentes 
import Carrusul from "../../components/carrusel/Carrusel"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Landing() {
    return (
        <div className={s.landing}>
            <div className={s.col1}>
                <Carrusul></Carrusul>
            </div> 
            <div className={s.col2}>
                <img src={logo} alt="" />
                {/* <h1 className={s.title_landing}>¡Bienevenido a Psicconection!.</h1> */}
                {/* <p className={s.description_landing}>
                    Conéctate con psicólogos de alta calidad y servicio excepcional. Charla, consulta y cuida tu bienestar mental aquí
                </p> */}

                <Link className={s.button} to="/home">
                    <button className={s.button2} >GET IN</button>
                </Link>
            </div>
        </div>
    )
}