import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './App.module.scss';
import Button from './components/Button/Button';
import { connectApi, disconnectApi } from './store/slice';

function App() {
  const dispatch = useDispatch();
  const chanId = useSelector((state) => state.orderBook.chanId);
  const orderBookData = useSelector((state) => state.orderBook.books);

  React.useEffect(() => {
    dispatch(connectApi('P2'));
    return () => dispatch(disconnectApi());
  }, [dispatch]);

  return (
    <div data-testid="app" className={styles.App}>
      <div className={styles.container}>
        <Button
          transparent
          onClick={() => dispatch(connectApi('P0'))}
          disabled={!!chanId}
        >
          P0
        </Button>
        <Button
          transparent
          onClick={() => dispatch(connectApi('P1'))}
          disabled={!!chanId}
        >
          P1
        </Button>
        <Button
          transparent
          onClick={() => dispatch(connectApi('P2'))}
          disabled={!!chanId}
        >
          P2
        </Button>
        <Button
          transparent
          onClick={() => dispatch(connectApi('P3'))}
          disabled={!!chanId}
        >
          P3
        </Button>
        <Button
          transparent
          onClick={() => dispatch(connectApi('P4'))}
          disabled={!!chanId}
        >
          P4
        </Button>
        <Button
          onClick={() => dispatch(disconnectApi())}
          transparent
          disabled={!chanId}
        >
          disconnect
        </Button>
        <div className={styles.content}>
          <table>
            <thead>
              <tr>
                <th>Count</th>
                <th>Amount</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(orderBookData?.bids).map(([key, book]) => (
                <tr key={key}>
                  <td>{book.count}</td>
                  <td>{book.amount}</td>
                  <td>{book.price}</td>
                </tr>
              ))}
              {Object.entries(orderBookData?.asks).map(([key, book]) => (
                <tr key={key}>
                  <td>{book.count}</td>
                  <td>{book.amount}</td>
                  <td>{book.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
