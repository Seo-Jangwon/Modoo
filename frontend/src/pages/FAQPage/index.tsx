import ContactModal from '@/components/Modal/ConatactModal/ContactModal';
import { css, Theme } from '@emotion/react';
import { ReactNode, useRef, useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { IoMdCard, IoMdExit, IoMdPhonePortrait } from 'react-icons/io';
import Accordion from './Accordion/Accordion';
import Card from './CardInFAQ/CardInFAQ';
import { s_1vs1Container, s_1vs1text, s_1vs1textWithAnchor, s_BodyContainer, s_TitleText } from './style';

interface categoryData {
  iconImage: ReactNode;
  text: string;
}

interface detailData {
  title: string;
  description: string;
  leftIcon: ReactNode;
}

const FAQPage = () => {
  const categoryDatas = useRef<categoryData[]>([
    {
      iconImage: <FaRegUser style={{ height: '50px', width: '50px', paddingBottom: '7px' }} />,
      text: '계정',
    },
    {
      iconImage: <IoMdCard style={{ height: '50px', width: '50px', paddingBottom: '7px' }} />,
      text: '요금/결제',
    },
    {
      iconImage: <FaRegUser style={{ height: '50px', width: '50px', paddingBottom: '7px' }} />,
      text: '사용 방법',
    },
    {
      iconImage: <FaRegUser style={{ height: '50px', width: '50px', paddingBottom: '7px' }} />,
      text: '기타',
    },
  ]);

  const detailDatas = useRef<detailData[][]>([
    [
      {
        leftIcon: (
          <IoMdPhonePortrait
            css={(theme: Theme) => css`
              color: ${theme.colors.secondary};
            `}
          />
        ),
        title: '2대 이상의 모바일 기기에서 이용하고 싶어요.',
        description:
          '하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마 ',
      },
      {
        leftIcon: (
          <IoMdExit
            css={(theme: Theme) => css`
              color: ${theme.colors.secondary};
            `}
          />
        ),
        title: '회원 탈퇴를 하고 싶어요.',
        description:
          '하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마 ',
      },
      {
        leftIcon: (
          <IoMdCard
            css={(theme: Theme) => css`
              color: ${theme.colors.secondary};
            `}
          />
        ),
        title: '상위 요금제로 업그레이드하고 싶어요.',
        description:
          '하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마 ',
      },
      {
        leftIcon: (
          <FaRegUser
            css={(theme: Theme) => css`
              color: ${theme.colors.secondary};
            `}
          />
        ),
        title: '비밀번호를 잊어버렸어요.',
        description:
          '하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마하지마 ',
      },
    ],
    [],
    [],
    [],
  ]);

  const [isClicked, isClickedChanged] = useState<number>(0);
  const [isContactModalOpen, setIsConatctModalOpen] = useState(false);

  function changeClickedIndex(idx: number): void {
    isClickedChanged(idx);
  }
  const openContactModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    setIsConatctModalOpen(true);
  };
  const closeContactModal = () => {
    // e.stopPropagation();
    setIsConatctModalOpen(false);
  };

  return (
    <>
      <div css={s_TitleText}>자주 묻는 질문</div>
      <div css={s_BodyContainer}>
        {categoryDatas.current.map((item, index) => {
          return (
            <Card
              key={index}
              iconImage={item.iconImage}
              text={item.text}
              isClicked={isClicked == index ? true : false}
              onClick={() => {
                changeClickedIndex(index);
              }}
            />
          );
        })}
      </div>
      <div>
        {detailDatas.current[isClicked].map((item, index) => {
          return <Accordion title={item.title} description={item.description} leftIcon={item.leftIcon} key={index} />;
        })}
      </div>
      <div css={s_1vs1Container}>
        <div css={s_1vs1text}>찾으시는 내용이 없나요?</div>
        <a css={s_1vs1textWithAnchor} onClick={openContactModal}>
          1:1 문의{' '}
        </a>
        {isContactModalOpen && <ContactModal handleClose={closeContactModal} />}
      </div>
    </>
  );
};

export default FAQPage;
