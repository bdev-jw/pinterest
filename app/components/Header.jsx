"use client"

import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { signIn, useSession, signOut } from 'next-auth/react'
import app from '../Shared/firebaseConfig'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiSearch, HiBell, HiChat } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && session) {
      saveUserInfo();
    }
  }, [session, mounted]);

  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name ?? '',
        email: session.user.email,
        userImage: session.user.image ?? ''
      });
    }
  }

  const onCreateClick = () => {
    if (session) {
      router.push('/pin-builder')
    } else {
      signIn('google', { prompt: 'select_account' }); // 계정 선택 화면 강제
    }
  }

  if (!mounted) return null

  return (
    <div className='flex justify-between gap-3 md:gap-2 items-center p-6'>
      <Image 
        src='/mesa_logo.png'
        alt='logo' 
        width={50} 
        height={50} 
        loading="lazy"
        onClick={() => router.push('/')} 
        className='hover:bg-gray-300 p-2 rounded-md cursor-pointer'
      />
      <button className='bg-black text-white p-2 px-4 rounded-md' onClick={() => router.push('/')}>Home</button>
      <button className='font-semibold p-2 px-4 rounded-md' onClick={() => onCreateClick()}>Create</button>
      <div className='bg-[#e9e9e9] p-3 gap-3 items-center w-full hidden md:flex'>
        <HiSearch className='text-[25px] text-gray-500'/>
        <input type='text' placeholder='Search' className='bg-transparent outline-none'/>
      </div>
      <HiSearch className='text-[25px] text-gray-500 md:hidden'/>
      <HiBell className='text-[25px] md:text-[40px] text-gray-500 cursor-pointer'/>
      <HiChat className='text-[25px] md:text-[40px] text-gray-500 cursor-pointer' />
      {session?.user ? 
        <Image 
          src={session.user.image}
          onClick={() => router.push('/' + session.user.email)}
          alt='user-image' 
          width={50} 
          height={50}
          loading="lazy"
          className='hover:bg-gray-300 p-2 rounded-md cursor-pointer'
        /> :
        <button className='font-semibold p-2 px-4 rounded-md' onClick={() => signIn('google', { prompt: 'select_account' })}>Login</button>
      }
    </div>
  )
}

export default Header