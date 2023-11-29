import { type Review } from '../../../../entities/review';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import styles from './index.module.css';

export const DeleteReviewModal = ({
  reviewItem,
  onClose,
  onDelete,
}: {
  reviewItem: Review | null;
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    <Modal isOpen={reviewItem !== null} onClose={onClose}>
      <h2>리뷰 삭제</h2>
      {reviewItem !== null &&
        (() => {
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
        })()}
    </Modal>
  );
};
