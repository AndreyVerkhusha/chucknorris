import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJokesId, setCurrentJokeId } from "../../store/reducers/mainReducer";
import ListElem from "../../components/List/ListElem/ListElem";

import "./CurrentJoke.scss";

const CurrentJoke = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const {currentJoke} = useSelector(state => state);

  useEffect(() => {
    if (typeof id !== "undefined") {
      dispatch(fetchJokesId(id));
    } 
  }, [id]);
  return (
    <div className="current_joke">
      {Object.keys(currentJoke)?.length > 0 &&
        <>
          <div
            className="prev_btn"
            onClick={() => {
              navigate(-1);
              dispatch(setCurrentJokeId({}));
            }}
          >
            Назад
          </div>
          <ListElem
            {...currentJoke}
            fullWidth={true}
            isCurrentPage={true}
          />
        </>
      }
    </div>
  );
};

export default CurrentJoke;