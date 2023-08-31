import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import { motion } from "framer-motion";

import "./ListElem.scss";

const ListElem = (props) => {
  const {
    value, fullWidth, categories, created_at,
    listAnimation, indx, isCurrentPage, id
  } = props;
  const navigate = useNavigate();

  return (
    <motion.div
      className={classNames("list_elem", {
        full_width: fullWidth,
        is_current_page: isCurrentPage
      })}
      onClick={() => (!isCurrentPage && navigate(`/${id}`))}
      variants={listAnimation}
      initial="hidden"
      animate="visible"
      exit="hidden"
      custom={((indx || 0) + 1) * 0.1}
    >
      {value &&
        <div className="value">
          {value}
        </div>
      }
      {(created_at || categories?.length > 0) &&
        <div className="row">
          {categories?.length > 0 &&
            <div className="row_elem">
              <span>Категория: </span>
              <span>{categories[0]}</span>
            </div>
          }
          {id &&
            <div className="row_elem">
              <span>Joke id: </span>
              <span>{id}</span>
            </div>
          }
          {created_at &&
            <div className="row_elem">
              <span>Create date: </span>
              <span>{moment(created_at).format("DD.MM.YYYY")}</span>
            </div>
          }
        </div>
      }
    </motion.div>
  );
};

export default ListElem;