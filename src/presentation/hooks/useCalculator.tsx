import { useRef, useState } from 'react';


enum Operators {
  add,
  subtract,
  multiply,
  divide,
}
export const useCalculator = () => {
  const [number, setNumber] = useState('0');

  const [prevNumber, setPrevNumber] = useState('0');


  const lastOperation = useRef<Operator>();
  const clean = ()=>{
    setNumber('0');
    setPrevNumber('0');
  };

  //borra el ultimo numero
  const deleteOperation = () =>{

    let currentSign = '';
    let temporalNumber = number;

    if(number.includes('-')){
      currentSign = '-';
      temporalNumber = number.substring(1);
    }
    if(temporalNumber.length > 1){
      return setNumber(currentSign + temporalNumber.slice(0,-1));
    }
    setNumber('0');
  };

  const toggleSign = () =>{
    if(number.includes('-')){
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };
  const buildNumber = (numberString: string) => {
    // Evitar múltiples puntos decimales
    if (numberString === '.' && number.includes('.')) {return;}

    // Manejar números que comienzan con 0 o -0
    if (number.startsWith('0') || number.startsWith('-0')) {
      // Punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      // Si es otro 0 y hay un punto decimal, permitir agregar ceros
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      // Si es diferente de 0 y no hay punto decimal, reemplazar el número
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      // Evitar múltiples ceros al inicio
      if (numberString === '0' && !number.includes('.')) {
        return;
      }
      return setNumber(number + numberString);
    }

    // Concatenar el nuevo número
    setNumber(number + numberString);
  };

  const setLastNumber = () =>{
    if(number.endsWith('.')){
      setPrevNumber(number.slice(0,-1));
    }else{
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const divideOperation = () =>{
    setLastNumber();
    lastOperation.current = Operators.divide;
  };
  const multiplyOperation = () =>{
    setLastNumber();
    lastOperation.current = Operators.multiply;
  };
  const subtractOperation = () =>{
    setLastNumber();
    lastOperation.current = Operators.subtract;
  };
  const addOperation = () =>{
    setLastNumber();
    lastOperation.current = Operators.add;
  };

  const calculatorResult = () =>{
    const num1 = Number(number);
    const num2 = Number(prevNumber);

    switch(lastOperation.current){
      case Operators.add:
        setNumber(`${num1} + ${num2}`);
        break;
      case Operators.subtract:
        setNumber(`${num2} - ${num1}`);
        break;
      case Operators.multiply:
        setNumber(`${num1} * ${num2}`);
        break;
      case Operators.divide:
        setNumber(`${num2} / ${num1}`);
        break;
      default:
        throw new Error('operation not implemented');
    }
    setPrevNumber('0');
  };
  return {
    //properties
    number,
    prevNumber,
    //metodos
    buildNumber,
    clean,
    deleteOperation,
    toggleSign,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculatorResult,
  };
};
