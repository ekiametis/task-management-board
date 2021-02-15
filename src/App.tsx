import { FC } from 'react';
import { Board } from './components/board/Board';

export const App: FC = () => {
  const title = "Task Management Board";
  return (
    <div>
      <Board title={title} />
    </div>
  );
}

export default App;
