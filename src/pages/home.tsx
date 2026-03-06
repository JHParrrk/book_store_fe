import Empty from "@/components/commons/Empty";
import Title from "@/components/commons/Title";
import Banner from "@/components/commons/banner/Banner";
import MainBest from "@/features/main/components/MainBest";
import MainNewBooks from "@/features/main/components/MainNewBooks";
import MainReview from "@/features/main/components/MainReview";
import { useMain } from "@/features/main/hooks/useMain";
import React from "react";
import styled from "styled-components";

const Home = () => {
  const { reviews, newBooks, bestBooks /*, banners */ } = useMain();

  return (
    <HomeStyle>
      {/* <Banner banners={banners} /> */}
      <section className="section">
        <Title size="large">베스트 셀러</Title>
        <MainBest books={bestBooks} />
      </section>
      <section className="section">
        <Title size="large">신간 안내</Title>
        {newBooks.length ? (
          <MainNewBooks books={newBooks} />
        ) : (
          <Empty title="신간이 없습니다." />
        )}
      </section>
      <section className="section">
        <Title size="large">리뷰</Title>
        <MainReview reviews={reviews} />
      </section>
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default Home;
