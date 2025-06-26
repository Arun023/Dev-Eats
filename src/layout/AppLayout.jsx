import './../index.css';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const AppLayout = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
};

export default AppLayout;
