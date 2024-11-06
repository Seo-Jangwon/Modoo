import DotDotDot from '@/components/DotDotDot/DotDotDot';
import { ReactNode, useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { RiMenuAddLine } from 'react-icons/ri';
import lala from '../../assets/lalaticon/lala.jpg';
import Heart from '../DetailPage/DetailCover/DetailCoverHeart';
import Modal from './Modal/Modal';
import {
  s_container,
  s_div_container,
  s_div_img,
  s_div_item,
  s_div_titie_img,
  s_div_title,
  s_h4,
  s_img,
  s_p,
} from './style';
import { useNavigate } from 'react-router-dom';

interface Record {
  title: string;
  image: string;
  artist: string;
  time: string;
  heart: boolean;
}

const mokData: { music: Record[] } = {
  music: [
    {
      title: 'fkfㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
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
      heart: true,
    },
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
      heart: true,
    },
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
      heart: true,
    },
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
      heart: true,
    },
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
      heart: true,
    },
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
      heart: true,
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDropDown, setIsDropDown] = useState<boolean>(false)
  const navigate = useNavigate()

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };


  // 드랍다운 닫기
  const closeDropDown = () => {
    setIsDropDown(false)
  }
  interface DropDownItems {
    iconImage: ReactNode;
    text: string;
    clickHandler: () => void;
  }

  const items: DropDownItems[] = [
    {
      iconImage: <RiMenuAddLine />,
      text: '플레이리스트 추가',
      clickHandler: openModal,
    },
    {
      iconImage: <FaRegTrashCan />,
      text: '기록에서 삭제',
      clickHandler: () => {
        console.log('기록에서 삭제');
      },
    },
  ];

  return (
    // 전체 레이아웃
    <div css={s_container}>
      {/* 최근 감상 기록 텍스트 */}
      <div css={s_div_title}>
        <h3>최근 감상 기록</h3>
      </div>
      {/* 최근 음악 데이터 */}
      <div css={s_div_container}>
        {mokData.music.map((item, index) => (
          <div key={index} css={s_div_item}>
            {/* 이미지와 제목 */}
            <div css={s_div_titie_img} onClick={() => navigate('/music/1')}>
              <div css={s_div_img}>
                <img src={lala} alt="라라" css={s_img} />
              </div>
              <h4 css={s_h4}>{item.title}</h4>
            </div>
            {/* 아티스트 */}
            <p css={s_p}>{item.artist}</p>
            {/* 하트 아이콘 */}
            <Heart isLike={item.heart} />
            {/* 드롭다운 */}
            <DotDotDot data={items} />
            {/* 시간 */}
            <p css={s_p}>{item.time}</p>
          </div>
        ))}
        {/* 모달 컴포넌트 */}
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default RecordPage;