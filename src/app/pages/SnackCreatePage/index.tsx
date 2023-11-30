import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ProfileImage } from '../../components/ProfileImage';
import { serviceContext } from '../../contexts/serviceContext';
import { useTypedContext } from '../../hooks/useTypedContext';
import styles from './index.module.css';

export const SnackCreatePage = () => {
  const [snackForm, setSnackForm] = useState<Partial<{ src: string; title: string }>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof typeof snackForm, string>>>({});

  const navigate = useNavigate();
  const { snackService } = useTypedContext(serviceContext);

  const isValid = snackForm.src && snackForm.title;

  const onSubmit = async () => {
    try {
      const validationResult = snackService.validateSnack(snackForm);
      if (!validationResult.valid) return setErrors(validationResult.errors);
      const createdSnack = await snackService.createSnack(validationResult.snack);
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
      <ProfileImage src={snackForm.src} />
      <Input
        label="이미지"
        value={snackForm.src ?? ''}
        onChange={(e) => setSnackForm({ ...snackForm, src: e.target.value })}
        errorMessage={errors.src}
      />
      <Input
        label="이름"
        value={snackForm.title ?? ''}
        onChange={(e) => setSnackForm({ ...snackForm, title: e.target.value })}
        errorMessage={errors.title}
      />
      <div className={styles.actions}>
        <Button variant="primary" disabled={!isValid}>
          추가
        </Button>
        <Button type="button" variant="third" onClick={() => navigate(-1)}>
          취소
        </Button>
      </div>
    </form>
  );
};
