import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type AuthService } from '../../../usecases/AuthService';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import styles from './index.module.css';

export const LoginPage = ({
  authService,
  setToken,
}: {
  authService: AuthService;
  setToken: (token: string) => void;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isValid = username.length > 0 && password.length > 0;

  const onLogin = async () => {
    if (!isValid) return;

    try {
      const { token } = await authService.login(username, password);
      setToken(token);
      navigate('/');
    } catch (e) {
      alert('로그인 실패');
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onLogin();
      }}
    >
      <Input value={username} onChange={(e) => setUsername(e.target.value)} label="아이디" />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} label="비밀번호" type="password" />
      <Button className={styles.button} variant="primary" disabled={!isValid}>
        로그인
      </Button>
    </form>
  );
};
