import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchJokes, setCurrentCategory } from "../../store/reducers/mainReducer";

import Search from "../../components/Search/Search";
import List from "../../components/List/List";
import Categories from "../../components/Filter/Categories";

const Main = () => {
  const dispatch = useDispatch();

  const {jokes, categories, currentCategory, total} = useSelector(state => state);
  const [searchValue, setSearchValue] = useState("");
  const [timeoutSearch, setTimeoutSearch] = useState(null);

  useEffect(() => {
    if (categories?.length === 0)
      dispatch(fetchCategories());
  }, []);
  useEffect(() => {
    // функция debounce, чтобы не слать лишние запросы на сервер пока пользователь печатает, а добавить небольшой таймаут.
    // Сделано чтобы облегчить нагрузку на сервер
    // и избежать визуальных рывков списка, если бэк будет слишком быстро возвращать результат
    if (searchValue.length >= 3) {
      dispatch(setCurrentCategory(""));
      if (timeoutSearch)
        clearTimeout(timeoutSearch);
      setTimeoutSearch(
        setTimeout(() => dispatch(fetchJokes(searchValue)), 300)
      );
    }
  }, [searchValue]);
  return (
    <>
      {categories?.length > 0 &&
        <Categories
          categories={categories}
          currentCategory={currentCategory}
        />
      }
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        total={total}
      />
      <List
        data={jokes?.result}
      />
    </>
  );
};

export default Main;