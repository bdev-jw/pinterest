import React from 'react'
import UserTag from '../UserTag'

function PinInfo({pinDetail}) {
  const user={
    name:pinDetail.userName,
    email:pinDetail.email,
    image:pinDetail.userImage
  }
  const handleOpenUrl = () => {
    console.log('URL:', pinDetail.link);
    if (pinDetail.link) {  // destination 대신 link 사용
      // URL이 http:// 또는 https://로 시작하는지 확인
      const url = pinDetail.link.startsWith('http') 
        ? pinDetail.link 
        : `https://${pinDetail.link}`;
        
      window.open(url, '_blank');
    } else {
      console.log('No URL provided');
    }
  }
  return (
    <div>
      <h2 className='text-[30px] font-bold mb-10'>{pinDetail.title}</h2>
      <UserTag user={user} />
      <h2 className='mt-10'>{pinDetail.desc}</h2>
      {pinDetail.link && (  // URL이 있을 때만 버튼 표시
      <button className='p-2 bg-[#e9e9e9] px-5 text-[23px]
      mt-10 rounded-full hover:scale-105 transition-all'
      onClick={handleOpenUrl}>Open Url</button>)}
    </div>
  )
}

export default PinInfo