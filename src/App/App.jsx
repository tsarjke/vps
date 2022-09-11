import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/reducers/vpsSlice';
import OfferCardList from '../components/OfferCardList/OfferCardList';
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Categories from '../components/Categories/Categories';

import cl from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  // const { data } = vpsApi.useFetchVps2Query();
  const { categories } = useSelector((store) => store.vpsReducer.vpsInfo);

  // useEffect(() => {
  //   dispatch(addVpsInfo(data));
  // }, [data]);

  const onCategoryChange = (selectedCategory) => {
    dispatch(setFilter(selectedCategory));
  };

  return (
    <div className="app">
      <Menu />
      <div className={cl.content}>
        <Header />
        <div className={cl.pageContainer}>
          <div className={cl.navigation}>
            <h4 className={cl.pageLabel}>Аккаунт</h4>
            <h1 className={cl.pageTitle}>Заказать VPS</h1>
          </div>
          <Categories
            options={categories ? categories.slice(0, categories.length - 1) : null}
            defaultValue={{ id: 0, slug: 'all', name: 'Все' }}
            onChange={onCategoryChange}
          />
          <OfferCardList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
