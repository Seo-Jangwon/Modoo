import { DARK_PALETTE } from '@/styles/tokens';
import { s_li, s_liTime, s_liTitle } from './DetailList.style';
import { useNavigate } from 'react-router-dom';

interface DetailListItemProps {
  index: number;
  title: string;
  duration: string;
  id: number
}

const getIndexColor = (index: number) => {
  if (index == 1) return DARK_PALETTE.primary;
  if (index == 2) return DARK_PALETTE.secondary;
};

const DetailListItem = ({id, index, title, duration }: DetailListItemProps) => {
  const navigate = useNavigate()
  return (
    <li css={s_li}>
      <div css={s_liTitle} onClick={() => navigate(`/music/${id}`)}>
        <h5
          style={{
            width: '64px',
            color: getIndexColor(index),
          }}
        >
          {index}
        </h5>
        <h5>{title}</h5>
      </div>
      <h5 css={s_liTime}>{duration}</h5>
    </li>
  );
};

export default DetailListItem;
