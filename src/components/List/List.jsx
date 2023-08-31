import React, { memo } from "react";
import ListElem from "./ListElem/ListElem";
import "./List.scss";

const List = ({data}) => {
  const listAnimation = {
    hidden: {opacity: 0},
    visible: (custom) => ({
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: custom
      }
    })
  };
  return (
    <div className="list">
      {data?.length > 0 &&
        data.slice(0, 11).map((elem, indx) => {
            if (indx === 0 || indx === 1)
              return (
                <ListElem
                  {...elem}
                  key={indx}
                  indx={indx}
                  fullWidth={true}
                  listAnimation={listAnimation}
                />
              );
            return (
              <ListElem
                {...elem}
                key={indx}
                indx={indx}
                listAnimation={listAnimation}
              />
            );
          }
        )
      }
    </div>
  );
};

export default memo(List);