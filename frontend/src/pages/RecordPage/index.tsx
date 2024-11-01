import { css } from '@emotion/react';
import { useState } from 'react';
import { VscHeart } from 'react-icons/vsc';
import lala from '../../assets/lalaticon/lala.jpg';
import { s_container, s_div_title, s_p } from './style';

interface Record {
  title: string;
  image: string;
  artist: string;
  time: string;
  heart: boolean;
}

const initialData: { music: Record[] } = {
  music: [
    {
      title: '라라',
      image: 'lala.jpg',
      artist: 'LALA',
      time: '4:10',
      heart: true,
    },
    {
      title: '라라',
      image: 'lala.jpg',
      artist: 'LALA',
      time: '4:10',
      heart: false,
    },
    {
      title: '라라',
      image: 'lala.jpg',
      artist: 'LALA',
      time: '4:10',
      heart: true,
    },
  ],
};

const RecordPage = () => {
  const [mokData, setMokData] = useState<{ music: Record[] }>(initialData);

  const handleHeart = (index: number) => {
    setMokData((prevData) => {
      const newMusic = [...prevData.music];
      newMusic[index].heart = !newMusic[index].heart;
      return { music: newMusic };
    });
  };

  return (
    // 전체 레이아웃
    <div css={s_container}>
      {/* 최근 감상 기록 텍스트 */}
      <div css={s_div_title}>
        <h3>최근 감상 기록</h3>
      </div>
      {/* 최근 음악 데이터 */}
      <div
        css={css`
          margin-top: 20px;
        `}
      >
        {mokData.music.map((item, index) => (
          <div
            key={index}
            css={css`
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid white;
              align-items: center;
              padding: 10px 0;
              :hover > div > div > img {
                filter: brightness(50%);
                transition: 0.3s;
              }
            `}
          >
            {/* 이미지와 제목 */}
            <div
              css={css`
                display: flex;
                align-items: center;
                width: 40%;
              `}
            >
              <div
                css={css`
                  width: 80px;
                  height: 80px;
                  margin-right: 20px;
                `}
              >
                <img
                  src={lala}
                  alt="라라"
                  css={css`
                    width: 100%;
                    height: 100%;
                    padding: 2px;
                    border-radius: 8px;
                  `}
                />
              </div>
              <h4
                css={css`
                  font-size: 24px;
                  color: white;
                  font-weight: 700;
                `}
              >
                {item.title}
              </h4>
            </div>
            {/* 아티스트 */}
            <p css={s_p}>{item.artist}</p>
            {/* 하트 아이콘 */}
            <VscHeart
              onClick={() => handleHeart(index)}
              css={css`
                cursor: pointer;
                color: ${item.heart ? 'red' : 'white'};
                font-size: 24px;
                transition: color 0.3s;
              `}
            />
            {/* 시간 */}
            <p css={s_p}>{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordPage;
