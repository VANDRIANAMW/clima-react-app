import React,{useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {
//state principal
const [ciudad, guardarCiudad]=useState('');
const [pais, guardarPais]=useState('');
const[error, guardarError]=useState(false);
const[resultado, guardarResultado]=useState({});

useEffect(()=>{
  //prevenir ejecucion
  if(ciudad==='')return;
  const consultarAPI = async () => {
    const appId='3c065741e3919bb3254dac30fc87096f';
 
    
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
 
    //consultar url
    const respuesta = await fetch(url);
    const resultado= await respuesta.json();
    
    guardarResultado(resultado);
  }
 consultarAPI();
}, [ciudad, pais]);

 const datosConsulta=datos=>{

   //validacion de los campos del formulario
   if(datos.ciudad==='' || datos.pais===''){
    guardarError(true);
     return;
   }
   //add al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
 }




//  cargar un componente ondicionalmente
let componente;
if(error){
  componente= <Error mensaje='Ambos campos son obligatorios' />
}else if(resultado.cod==='404'){
 componente=<Error mensaje = 'La ciudad ingresada no existe en el pais ingresado o no existe en nuestro registro'/>;
}
else{
  componente=<Clima 
              resultado={resultado}
  />;
}

  return (
  <div className='App'>
    <Header
    titulo='Aplicacion React del clima'
     />
     <div className='contedor-form' id='contenedor-form'>
       <div className='container'>
         <div className='row'>
           <div className='col s12 m6'>
              <Formulario
               datosConsulta={datosConsulta} />
           </div>
           <div className='col s12 m6' >
              {componente}
           </div>
         </div>
       </div>
     </div>
  </div>
  );
}

export default App;
