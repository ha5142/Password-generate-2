import { useCallback, useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
const [length, setLength] = useState(8);
const [number, setNumber] = useState(false);
const [charAllowed, setChar] = useState(false);
const [Password, setPassword] = useState("")

const copyToClipboard = useCallback(() => {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,5)
  window.navigator.clipboard.writeText(Password)
}, [Password])

const passwordRef = useRef(null)
const PasswordGenerator = useCallback(() => {   // usecallback's memorize cache have thse variable(length, number, charAllowed)

let pass = ''
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

if (number) {
  str += "0123456789"
}
if (charAllowed) {
  str += "!@#$%^&*()"
}

for (let i=1; i<=length; i++) {
  
  let char = Math.floor(Math.random() * str.length + 1)
  pass += str.charAt(char);
  console.log(pass);
}
setPassword(pass);
},[length, number, charAllowed, setPassword]);  // array dependicies they are optimize  these variable


useEffect(() => {
  PasswordGenerator();
}, [length, number, charAllowed, PasswordGenerator])  // these array dependicies they are reusable when change something in these variables(length, number, chraAllowed)

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
     <h1 className='text-white text-center my-3'>Password genertor</h1> 
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type='text' 
      value={Password} 
      className='outline-none w-full py-1 px-3 bg-white'
      placeholder='Password'
      readOnly 
      />

      <button  onClick={copyToClipboard} 
      className='outline-none bg-blue-700 tex-white px-3 py-0.5 shrink-0 active:backdrop-blur-2xl'>Copy</button>

     </div>
     <div className='flex text-smn gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type='range'
        min={5}
        max={20}
        value={length}
        className='cursor-pointer'
        onChange={(e) => (setLength(e.target.value)) }  //changing the setLength mehod properties
        />
        <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked = {number}
        id='numberInput'
        onChange={() => {
          setNumber((prev) => !prev); //prev value to reverse value 
        }}
        />
        <label htmlFor='numberInput'>Numbers</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked = {number}
        id='charInput'
        onChange={() => {
          setNumber((prev) => !prev);
        }}
        />
        <label htmlFor='charInput'>Characters</label>
      </div>
     </div>

  </div>
  )
}

export default App
