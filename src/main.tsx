import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BoardProvider } from './contexts/BoardContext';
import { ModalProvider } from './contexts/ModalContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BoardProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </BoardProvider>,
);
