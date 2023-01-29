import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //  Leer CITAS en el local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }


  //  ARREGLO DE TODAS LAS CITAS
  const [citas, guardarCitas] = useState(citasIniciales);

  //  Leer cambios/operaciones en el STATE con useEffect
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas] ); //  Solo se ejecutara una vez


  //  Funcion para leer las CITAS (actuales y nuevas)
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }


  //  Eliminar CITA mediante su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    //  Guardando el nuevo arreglo
    guardarCitas(nuevasCitas);
  }


  //  Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administrar tus citas';


  return (
    <Fragment>
    <h1>Admr. de pacientes</h1>

      <div className="container">
        <div className="row">
        <div className="one-half column">
          <Formulario crearCita={crearCita} />
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita 
            key={cita.id} 
            cita={cita} 
            eliminarCita={eliminarCita}
            />
          ))}
        </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;