import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import LoadingDots from '@/components/loading-dots'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isHangup, setIsHangup] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(false)
  const opeartionOnDial = () => {
    setDisabled(true);
    window.parent.postMessage('Dial', 'http://localhost:3000')
  }
  const operationOnHangup = () => {
    setDisabled(false);
    window.parent.postMessage('Hangup', 'http://localhost:3000')
  }

  useEffect(() => {
    const getMessage =(message: MessageEvent) => {
      if(message.origin !== 'http://localhost:3000') return;
      if(message.data == 'From Parent'){
        // setIsHangup();
        // setDisabled
      }
    }
    window.addEventListener('message', getMessage, false);
    return () => window.removeEventListener('message', getMessage);
  },[])
  return (
    <div className='w-full flex flex-col justify-between border-2 border-black rounded-sm h-80 m-10'>
      <div className='flex justify-between p-4'>
        <h1>CRM Application</h1>
        <button className='border border-black rounded-md flex items-center justify-center h-8 w-8 px-2'>
          x
        </button>
      </div>
      <div className='flex justify-end py-4 px-20 gap-10 border-t-2 bg-[#F0F1F5]'>
        <button
          onClick={opeartionOnDial}
          disabled={disabled}
          className={`flex items-center justify-center bg-[#5AC493] w-24 text-white rounded-md ${disabled == true ? ' cursor-not-allowed opacity-70' : ''}`}>
          {disabled ? <span>Dialing <LoadingDots /></span> : 'Dial'}
        </button>
        <button
          onClick={operationOnHangup}
          className='flex items-center justify-center bg-[#DC3939] w-24 h-8 text-white rounded-md'>
          Hangup
        </button>
      </div>
    </div>
  )
}
