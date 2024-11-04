import Image from 'next/image'
import React from 'react'

function PinImage({ pinDetail }) {
  const hasValidImage = pinDetail?.image && typeof pinDetail.image === 'string' && pinDetail.image.trim() !== '';

  return (
    <div className='relative w-full h-full'>  {/* 컨테이너 div에 상대적 크기 지정 */}
      {hasValidImage ? (
        <Image 
          src={pinDetail.image}
          alt={pinDetail.title || 'Pin image'}
          width={1000}
          priority={true}  // LCP 성능 개선을 위해 추가
          height={1000}
          className='rounded-2xl w-auto h-auto'  
          style={{
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded-2xl"></div>
      )}
    </div>
  )
}

export default PinImage