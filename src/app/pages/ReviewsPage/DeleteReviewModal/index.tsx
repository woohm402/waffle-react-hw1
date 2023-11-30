import { type Review } from '../../../../entities/review';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { serviceContext } from '../../../contexts/serviceContext';
import { useMutation } from '../../../hooks/useMutation';
import { useTypedContext } from '../../../hooks/useTypedContext';
import styles from './index.module.css';

export const DeleteReviewModal = ({
  reviewItem,
  onClose,
  onDeleteSuccess,
}: {
  reviewItem: Review | null;
  onClose: () => void;
  onDeleteSuccess: () => void;
}) => {
  return (
    <Modal isOpen={reviewItem !== null} onClose={onClose}>
      <h2>리뷰 삭제</h2>
      {reviewItem !== null && (
        <ModalContent onDeleteSuccess={onDeleteSuccess} reviewItem={reviewItem} onClose={onClose} />
      )}
    </Modal>
  );
};

const ModalContent = ({
  reviewItem,
  onDeleteSuccess,
  onClose,
}: {
  reviewItem: Review;
  onDeleteSuccess: () => void;
  onClose: () => void;
}) => {
  const { mutate: deleteReview } = useDeleteReview(reviewItem.id);

  const onDelete = () =>
    deleteReview(undefined, {
      onSuccess: () => {
        onDeleteSuccess();
        onClose();
      },
    });

  return (
    <>
      <p className={styles.description}>&quot;{reviewItem.snack.title}&quot;에 대한 리뷰를 삭제하시겠습니까?</p>
      <div className={styles.actions}>
        <Button variant="danger" data-testid="delete-review-delete" onClick={onDelete}>
          삭제
        </Button>
        <Button variant="third" data-testid="delete-review-cancel" onClick={onClose}>
          취소
        </Button>
      </div>
    </>
  );
};

const useDeleteReview = (id: Review['id']) => {
  const { reviewService } = useTypedContext(serviceContext);
  return useMutation({ mutationFn: () => reviewService.deleteReview(id) });
};
