import React, { useEffect, useState } from "react";
import { Modal, Carousel, Typography, Spin } from "antd";
import styled from "styled-components";
import { db, getDocs, collection } from "../pages/firebase";
import giftBox1 from "../images/gift_box1.png";
import giftBox2 from "../images/gift_box2.png";

const StyledTitle = styled.div`
  padding-right: 30px;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

const CarouselContentStyle = styled.div`
  height: 300px;
  background: #d0e8ff;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;

  @media (max-width: 700px) {
    flex-direction: column;
    height: auto;
  }
`;

const CarouselContent = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  width: 60%;

  @media (max-width: 700px) {
    width: 100%;
    margin-bottom: 20px;
    font-size: 20px;
  }
`;

const CarouselImage = styled.div`
  width: calc(40% - 20px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 200px;
  border-radius: 20px;
  border: solid 3px #B5D4FF;
  box-shadow: 0 5px 20px 1px #5C94E4;

  @media (max-width: 700px) {
    width: 100%;
    height: 150px;
  }
`;

const GiveawayPopup = () => {
  const [visible, setVisible] = useState(false);
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const POPUP_INTERVAL = 2 * 60 * 1000; // 4 minutes

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, "giveawayPopup"));
        setCarouselItems(snapshot.docs.map(doc => doc.data()));
      } catch (error) {
        console.error("Error fetching carousel items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();

    const lastShown = localStorage.getItem('popupLastShown');
    const now = new Date().getTime();

    if (lastShown && now - lastShown < POPUP_INTERVAL) {
      const remainingTime = POPUP_INTERVAL - (now - lastShown);
      setTimeout(() => setVisible(true), remainingTime);
    } else {
      setVisible(true);
      localStorage.setItem('popupLastShown', now);
    }

    const intervalId = setInterval(() => {
      setVisible(true);
      localStorage.setItem('popupLastShown', new Date().getTime());
    }, POPUP_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Modal
      title={
        <StyledTitle>
          <img src={giftBox1} alt="GIFT" width="80px" />
          <Typography
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Before you go, be sure to check out our incredible Product Giveaways
            and Exclusive Discounts.
          </Typography>
        </StyledTitle>
      }
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      width={600}
    >
      {loading ? (
        <Spin style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <Carousel autoplay>
          {carouselItems.map((item, index) => (
            <div key={index}>
              <CarouselContentStyle>
                <CarouselContent>{item.description}</CarouselContent>
                <CarouselImage style={{ backgroundImage: `url(${item.image})` }} />
              </CarouselContentStyle>
            </div>
          ))}
        </Carousel>
      )}
      <img src={giftBox2} alt="GIFT" style={{
        width: '80px',
        position: 'absolute',
        marginTop: '-100px',
        right: 20
      }} />
    </Modal>
  );
};

export default GiveawayPopup;
