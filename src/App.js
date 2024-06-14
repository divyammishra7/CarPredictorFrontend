import logo from './logo.svg';
import './index.css';
import { useRef } from 'react';
import { data } from './data';
import { useEffect, useState } from 'react';
import { Button, FormLabel, Input, Select } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { carBrands,carModels ,fuelTypes} from './data';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

function App() {

 //
 const [company,setCompany]=useState("none");
 const [year,setYear]=useState(0);
 const [model,setModel]=useState("none");
 const [fueltype,setFuelType]=useState('Petrol');
 const [kilometer,setKiloMeter]=useState(0);
 const [prediction,setPrediction]=useState(null);
 const handleChange=(e)=>{
  setPrediction(null);
  if(e.target.value.length<=0){
    setCompany("none");
    return;
  }
  
  setCompany(e.target.value);
 
 }
 const handleChange2=(e)=>{
  setPrediction(null);
setYear(e.target.value)
 }
 const handleChange3=(e)=>{  setPrediction(null);
  
  setKiloMeter(e.target.value);

 }
 const handleChange4=(e)=>{
  setPrediction(null);
  if(e.target.value.length<=0){
    setModel("none");
    return;
  }
  setModel(e.target.value);
 }
 const handleChange5=(e)=>{
  setPrediction(null);
  if(e.target.value.length<=0){
    setFuelType("none");
    return;
  }
  setFuelType(e.target.value);
 }
 const handleSubmit=async()=>{
  onOpen();
  const features={
    name:model,
    company:company,
    year:year,
    kms_driven:kilometer,
    fuel_type:fueltype
  }
  console.log(features);
 
  try {
    const response = await fetch('https://carpredictorregression.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your API requires, such as authentication tokens
      },
      body: JSON.stringify(features),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
   console.log(data);
   setPrediction(data);
  } catch (error) {
    
    console.error('Error:', error);
    // Handle any errors that occurred during the fetch
  }
 

 }

 const { isOpen, onOpen, onClose } = useDisclosure()
 const finalRef = useRef(null)
 
  return (
    <div className="header w-[80%] mx-auto"  >
      <Heading className='text-center text-white'>
      
        Car Price Predictor
   
      </Heading>
      <h2 className='text-white text-center text-xl mt-5'>
        This app predicts the price of your selected model of the car
      </h2>
      <div className='form flex flex-col mt-5 py-8'>
    <FormLabel className='text-white text-xl'>Select the Company</FormLabel>
    <Select placeholder='Select option'  bg='white' className='bg-white' onChange={handleChange}>
      
      {carBrands.map((item)=>{
        return   <option value={item} key={item}>{item}</option>
      })}

</Select>
<FormLabel className='text-white text-xl'>Select the Model</FormLabel>
    <Select placeholder='Select option'  bg='white' className='bg-white' onChange={handleChange4}>
      {carModels.map((item)=>{
        if(item.includes(company)){
          return   <option value={item}>{item}</option>
        }
      })}

</Select>
<FormLabel className='text-white text-xl'>Enter the Year</FormLabel>
<Input type='number ' bg='white' placeholder='Enter The year' onChange={handleChange2}/>

<FormLabel className='text-white text-xl'>Enter Kilometers</FormLabel>
<Input type='number ' bg='white' placeholder='Enter Kms Traveled' onChange={handleChange3}/>


<FormLabel className='text-white text-xl'>Select the Fuel Type</FormLabel>
    <Select placeholder='Select option'  bg='white' className='bg-white' onChange={handleChange5}>
 {fuelTypes.map((item)=>{return <option value={item} key={item}>{item}</option>})}
</Select>


</div>
       
<Button backgroundColor={"tomato"} onClick={handleSubmit}> Predict</Button>
{prediction?
<div className='text-center text-white'>
  
  </div>:""}
      
  <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Predictions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
         {<div className='flex flex-col'>
          <span className='font-bold mt-5 '>Name:{model}</span>
          <span  className='font-bold mt-5'>Company:{company}</span>
          <span  className='font-bold mt-5'>Year:{year}</span>
          <span  className='font-bold mt-5'>Kms Traveled:{kilometer}</span>
          <span  className='font-bold mt-5'>Fuel Type:{fueltype}</span>
          <span className='font-bold mt-5'>Expected Price:{prediction}</span>

          </div>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>

  );
}

export default App;
