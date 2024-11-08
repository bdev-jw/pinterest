import app from '@/app/Shared/firebaseConfig'
import PinItem from './../Pins/Pinitem'
import React, { useEffect } from 'react'

function PinList({listOfPins}) {
   console.log(listOfPins)
  return (
    <div className=' mt-7 px-2 md:px-5 columns-2 md:columns-3 lg:col-span-4 xl:col-span-5 space-y-6 mx-auto'>
        {listOfPins.map((item,index)=>(
            <div key={index}>
                <PinItem pin={item} />
            </div>
        ))}
    </div>
  )
}

export default PinList