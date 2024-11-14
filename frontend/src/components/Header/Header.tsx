import useAuthStore from '@/stores/authStore';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import SearchBox from '../SearchBox/SearchBox';
import SideBar from '../SideBar/SideBar';
import { s_container, s_logo } from './Header.style';

interface HeaderProps {
  search: boolean;
}

const Header = ({ search }: HeaderProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  console.log(isLoggedIn);

  return (
    <nav css={s_container}>
      <div css={{ display: 'flex', gap: '8px', alignItems: 'center', zIndex: 1 }}>
        <SideBar />
        <NavLink css={s_logo} to="/">
          <img src="/logo.svg" alt="logo" />
        </NavLink>
      </div>
      {search && <SearchBox />}
      {search && (
        <div style={{ zIndex: 0 }}>
          {isLoggedIn ? (
            <img src="/logo.svg" onClick={() => navigate('/profile')} />
          ) : (
            <Button
              variant="inverted"
              style={{ borderRadius: '12px', padding: '8px 20px' }}
              onClick={() => navigate('signin')}
            >
              로그인
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
