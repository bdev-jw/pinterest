"use client"
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import app from './Shared/firebaseConfig';
import { useEffect, useState } from 'react';
import PinList from './components/Pins/PinList';

export default function Home() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    getAllPins();
  }, []);

  const getAllPins = async () => {
    const q = query(collection(db, 'pinterest-post'));
    const querySnapshot = await getDocs(q);

    // 데이터 배열을 가져온 후 랜덤하게 섞기
    const pins = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Fisher-Yates 알고리즘을 사용하여 배열 섞기
    for (let i = pins.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pins[i], pins[j]] = [pins[j], pins[i]]; // Swap
    }

    setListOfPins(pins);
  }

  return (
    <>
      <div className='p-3'>
        <PinList listOfPins={listOfPins} />
      </div>
    </>
  )
}