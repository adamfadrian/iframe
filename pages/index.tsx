import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import LoadingDots from '@/components/loading-dots'

const inter = Inter({ subsets: ['latin'] })

const Nasabar = [
  {
    id: 1,
    name: 'Rendra',
    phone: '081399817946'
  },
  {
    id: 2,
    name: 'Kristian',
    phone: '0812777238',
  },
  {
    id: 3,
    name: 'Okta Ginting',
    phone: '08123433223'
  },
  {
    id:4,
    name: 'John Doe',
    phone: '08231332745'
  }
]


export default function Home() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [parentMessage, setParentMessage] = useState('');
  const [fromParent, setFromParent] = useState(false)

  const opeartionOnDial = () => {
    setDisabled(true)
    window.parent.postMessage('Dial', 'http://localhost:3000')
  }
  const operationOnHangup = () => {
    setDisabled(false)
    window.parent.postMessage('Hangup', 'http://localhost:3000')
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:3000') return;
      if (event.data == 'From Parent') {
        setParentMessage(event.data)
        setDisabled(false)
        console.log('fromparent: ' , event.data)
        // 
      }

      if(event.data == 'From Parent') window.parent.postMessage('Hangup', 'http://localhost:3000')
    };
    window.addEventListener('message', handleMessage, false);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [parentMessage]);
  return (
    <div className='w-full flex flex-col justify-between border-2 border-black rounded-sm h-80 m-10'>
      <div className='flex justify-between p-4'>
        <h1>CRM Application</h1>
        <button className='border border-black rounded-md flex items-center justify-center h-8 w-8 px-2'>
          x
        </button>
      </div>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr className="bg-base-200">
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
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
