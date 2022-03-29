import { useRef } from 'react';
import { GoAlert } from 'react-icons/go';
import AcessoService from '../../../services/AcessoService';
import styles from './styles.module.css';

interface AcessoRestrito {
  handleAccess: (access: boolean) => void
}

export default function AcessoRestrito({ handleAccess }: AcessoRestrito) {
  const inputRef = useRef<HTMLInputElement>(null)
  const acessoService = new AcessoService()

  async function handleButtonClick() {
    if (inputRef.current) {
      const code_input = inputRef.current.value

      try {
        const response = await acessoService.acesso(code_input)
        const { valid } = response.data
        handleAccess(valid)
      } catch (error) {
        alert("⚠️ Código inválido")
      }

    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <GoAlert /> <strong>Acesso restrito</strong>
      </div>
      <br/>

      <div className={styles.input}>
        <label htmlFor="code">Insira o código</label>
        <input
          id="code"
          type="password"
          autoComplete="off"
          ref={inputRef}
        />
      </div>

      <br/>

      <button
        className={styles.button}
        type="button"
        onClick={handleButtonClick}
      >
        Enter
      </button>

    </div>
  );
}