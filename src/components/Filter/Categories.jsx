import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { setCurrentCategory } from "../../store/reducers/mainReducer";
import classNames from "classnames";

import arrow from "../../assets/icons/arrow.png";
import "./Categories.scss";

const Categories = ({categories, currentCategory}) => {
  const [openCategory, setOpenCategory] = useState(false);
  const dispatch = useDispatch();
  
  return (
    <div
      className="categories"
      tabIndex={0}
      onClick={() => setOpenCategory(!openCategory)}
      onBlur={() => setOpenCategory(false)}
    >
      <div className="categories_parent">
        {currentCategory
          ? <span>{currentCategory}</span>
          : <span className="placeholder">Select category...</span>
        }
      </div>
      <img
        src={arrow}
        className={openCategory ? "open" : ""}
        alt="arrow"
      />
      <div
        className={classNames("categories_children", {
          open: openCategory
        })}
      >
        {categories.map((elem) =>
          <div
            className={classNames("elem", {
              active: currentCategory === elem
            })}
            onClick={() => dispatch(setCurrentCategory(elem))}
            key={elem}
          >
            <span>{elem}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Categories);