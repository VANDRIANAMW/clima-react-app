import React from 'react';

function Clima({resultado}){

    //extraer los valores
  const {name, main}=resultado;
  if(!name)return null;
 
  //el resultado lo da en grados kelvin, aqui lo transformamos a centigrados
  const kelvin=273.15;

return(
   <div className='card-panel white col s12'>
       <div className='black-text'>
        <h2>El clima de {name} es:</h2>
        <p className='temperatura'>
        {parseInt(main.temp - kelvin, 10)}<span>°C</span>
        </p>
        <p className='temperaturam'>Temperatura maxima: {parseInt(main.temp_max  - kelvin, 10)}°C</p>
        <p className='temperaturam'>Temperatura minima: {parseInt(main.temp_min - kelvin, 10)}°C</p>
       </div>
   </div> 
)
}

export default Clima;