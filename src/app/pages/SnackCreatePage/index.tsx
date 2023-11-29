import { useState } from 'react';
import { useNavigate } from 'react-router';

import { createSnackSrc, createSnackTitle } from '../../../entities/snack';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ProfileImage } from '../../components/ProfileImage';
import { serviceContext } from '../../contexts/serviceContext';
import { useTypedContext } from '../../hooks/useTypedContext';
import styles from './index.module.css';

export const SnackCreatePage = () => {
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  const { snackService } = useTypedContext(serviceContext);

  const onSubmit = async () => {
    try {
      const createdSnack = await snackService.createSnack({ title: createSnackTitle(title), src: createSnackSrc(src) });
      navigate(`/snacks/${createdSnack.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h3 className={styles.title}>새 과자</h3>
      <ProfileImage />
      <Input label="이미지" value={src} onChange={(e) => setSrc(e.target.value)} />
      <Input label="이름" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className={styles.actions}>
        <Button variant="primary">추가</Button>
        <Button type="button" variant="third" onClick={() => navigate(-1)}>
          취소
        </Button>
      </div>
    </form>
  );
};
