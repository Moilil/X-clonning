import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import styled from "styled-components";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      /*
        const snapshot = await getDocs(tweetsQuery);
        const tweets = snapshot.docs.map((doc) => {
          // 각 문서마다 쿼리한 데이터 객체를 만듦
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return { tweet, createdAt, userId, username, photo, id: doc.id };
        });
        */

      // 문서를 한 번만 가져오지 않고 쿼리에 리스너를 추가하는 방식으로 변경
      // 무언가 삭제, 편집, 생성되었다는 알림을 받으면 해당 쿼리의 문서를 보면서 필요한 데이터 추출
      // 추출된 데이터를 map()을 통해 배열로 생성
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return { tweet, createdAt, userId, username, photo, id: doc.id };
        });
        setTweet(tweets);
      });
      // 추출한 트윗 정보들을 상태(setTweet)에 저장해줌
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
