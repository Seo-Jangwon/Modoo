import apiClient from '@/api/apiClient';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import useAuthStore from '@/stores/authStore';
import useUserInfoStore from '@/stores/userInfoStore';
import { isValidEmail, isValidPassword } from '@/utils/validator';
import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { s_button, s_container, s_content, s_error_box, s_form, s_links, s_titlebox } from './style';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email) || !isValidPassword(password)) {
      setError('잘못된 ID 또는 비밀번호입니다.');
      return;
    }

    apiClient
      .post('/members/login', { email, password })
      .then((res) => {
        setAccessToken(res.headers.authorization);
        fetchUserInfo();
        navigate('/');
      })
      .catch((err) => {
        setError(err.response.data.message ?? '로그인에 실패하였습니다.');
      });
  };

  const fetchUserInfo = () => {
    apiClient
      .get('/members/info')
      .then((res) => {
        setUserInfo(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main css={s_container}>
      <section css={s_content}>
        <article css={s_titlebox}>
          {error && (
            <div css={s_error_box}>
              <FiAlertTriangle size={24} />
              <p>{error}</p>
            </div>
          )}
          <p css={(theme) => ({ color: theme.colors.lightgray })}>모음에 오신 걸 환영해요!</p>
          <p>당신이 어떤 사람인지 알고 싶어요.</p>
        </article>
        <form css={s_form} onSubmit={handleSubmit}>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <Button type="submit" css={s_button} variant="grad">
            로그인
          </Button>
        </form>
        <ul css={s_links}>
          <Link to="/findpw">비밀번호 찾기</Link>|<Link to="/findid">아이디 찾기</Link>|
          <Link to="/signup">회원가입</Link>
        </ul>
      </section>
      {/* <section css={s_oauth_box}>
        <div css={s_line_text}>
          <Line />
          <p>다른 방법으로 계속하기</p>
          <Line />
        </div>
        <div css={s_oauth_box_button}>
          <OauthButton to="/oauth/google" Icon={googleLogo} title="Google" />
          <OauthButton to="/oauth/kakao" Icon={kakaoLogo} title="Kakao" />
          <OauthButton to="/oauth/facebook" Icon={facebookLogo} title="Facebook" />
        </div>
      </section> */}
    </main>
  );
};

export default SignInPage;
