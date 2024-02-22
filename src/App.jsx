import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [numallowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numallowed) str += "0123456789"
    if (charAllowed) str += "!@#$&*~`+-*/"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, numallowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
  }, [password])
      // if we want an better optimization we can use useEffect hook

      // useEffect(() => {
      //   passwordGenerator()
      // }, [length, numallowed, charAllowed, passwordGenerator])
    
  return (
    <>
      <div className='flex justify-center mt-52'>

        <div className='w-1/3   shadow-md rounded-lg px-2 h-1/2 my-8 text-orange-500 bg-gray-700'>
          <h1 className='text-3xl text-center text-white mt-6 my-3'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
            <input type="text" value={password}
              className='outline-none w-full py-1 px-3 '
              placeholder='Password'
              readOnly
              ref={passwordRef}
            />
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500'
              onClick={copyPasswordToClipboard}
            >Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" min={6} max={15} value={length}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label className='hover:text-white' >Length:{length}</label>
            </div>
            <div className='flex item-center gap-x1 '>
              <input type="checkbox" defaultChecked={numallowed}
                id="numberInput" onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className='hover:text-white'>Numbers</label>
            </div>
            <div className='flex item-center gap-x-1'>
              <input type="checkbox" id="charcterInput" defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput" className='hover:text-white'>Characters</label>
            </div>
          </div>
          <div className='flex items-center justify-center'>

              <button onClick={()=>{passwordGenerator()}} className='text-white rounded-2xl  mt-5 mb-2 py-2 px-2 bg-blue-700 hover:bg-blue-500 '>Generate</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
