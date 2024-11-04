"use client"

import React, { useEffect, useState } from 'react'
import app from '../Shared/firebaseConfig'
import UserInfo from './../components/UserInfo'
import { getFirestore, query, getDocs, getDoc, doc, collection, where } from 'firebase/firestore'
import PinList from './../components/Pins/PinList'
import { useParams } from 'next/navigation'

function Profile() {
  const params = useParams();  // useParams 훅 사용
  const db = getFirestore(app)
  const [userInfo, setUserInfo] = useState();
  const [listOfPins, setListOfPins] = useState([]);
  const [mounted, setMounted] = useState(false);  // 마운트 상태 추가

  useEffect(() => {
    setMounted(true);
    if (params?.userId) {
      const email = params.userId.replace('%40','@');
      getUserInfo(email);
    }
  }, [params?.userId]);

  const getUserInfo = async(email) => {
    const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data())
    } else {
      console.log("No such document!");
    }
  }
    
  useEffect(() => {
    if (userInfo) {
      getUserPins()
    }
  }, [userInfo])

  const getUserPins = async() => {
    const q = query(
      collection(db, 'pinterst-post'),
      where("email", '==', userInfo.email)
    );
    const querySnapshot = await getDocs(q);
    const pins = [];
    querySnapshot.forEach((doc) => {
      pins.push(doc.data());
    });
    setListOfPins(pins);  // 상태 업데이트 최적화
  }

  if (!mounted) return null;  // 초기 렌더링 시 null 반환

  return (
    <div>
      {userInfo ? (
        <div>
          <UserInfo userInfo={userInfo} />
          <PinList listOfPins={listOfPins} />
        </div>
      ) : null}
    </div>
  )
}

export default Profile