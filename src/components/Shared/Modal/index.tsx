import { ReactElement } from 'react';
import styles from './styles.module.css';

interface ModalComponent {
  isOpen: boolean;
  children: ReactElement
}

export default function Modal({ isOpen, children }: ModalComponent) {
  return (
    <div className={`${styles.modal} ${!isOpen && styles.modal_none}`}>
      <div className={styles.modal__container}>
        {children}
      </div>
    </div>
  );
}