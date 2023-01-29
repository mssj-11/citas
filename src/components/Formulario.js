import React, { Fragment, useState } from 'react';
import {  v4 as  uuidv4  } from 'uuid';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {
    //  Creando el objeto STATE de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    //  Funcion State ERROR
    const [  error, actualizarError  ] = useState(false);


    //  Esta funcion se ejecutara cada que un usuario escriba en los input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    }

    //  Extrayendo los valores
    const {   mascota, propietario, fecha, hora, sintomas  } = cita;

    //  Funcion Enviar CITA
    const enviarCita = e => {
        e.preventDefault();

        //  Validaciones
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }
        //  Limpiar mensaje previo
        actualizarError(false);

        //  Asignar un ID con la libreria: npm i uuid
        cita.id = uuidv4();
        console.log(cita);

        //  Crear la cita
        crearCita(cita);


        // Reiniciar el Formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }


    return(
        <Fragment>
            <h2>Crear cita</h2>
            {   error ? <p className='alerta-error'>Todos los campos son obligatorios</p> : null  }

            <form onSubmit={enviarCita}>
                <label>Nombre Mascota</label>
                <input type="text" name="mascota" onChange={actualizarState} value={mascota} className="u-full-width" placeholder='Nombre mascota' />

                <label>Nombre Dueño</label>
                <input type="text" name="propietario" onChange={actualizarState} value={propietario} className="u-full-width" placeholder='Nombre del dueño de la mascota' />

                <label>Fecha</label>
                <input type="date" name="fecha" onChange={actualizarState} value={fecha} className="u-full-width" />

                <label>Hora</label>
                <input type="time" name="hora" onChange={actualizarState} value={hora} className="u-full-width" />
                
                <label>Sintomas</label>
                <textarea name="sintomas" onChange={actualizarState} value={sintomas} className="u-full-width" placeholder='Sintomas de la mascota' ></textarea>

                <button type='submit' className="u-full-width button-primary" >Agregar cita</button>
            </form>
        </Fragment>
    );
}


//  Documentando el componente con PropTypes
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;