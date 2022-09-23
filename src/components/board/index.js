import missImg from "assets/miss.png";
import hitImg from "assets/hit.png";
import classes from "./index.module.css";

const Board = ({ onClick, board }) => (
  <div className={classes.board}>
    {board?.map((row, rowId) => (
      <div className={classes.row} key={rowId}>
        {row.map((cell, cellId) => (
          <div
            className={`${classes.unit} ${cell.hit ? cell.ship : ""}`}
            style={{
              backgroundImage: cell.hit
                ? `url(${hitImg})`
                : cell.miss
                ? `url(${missImg})`
                : "",
            }}
            key={rowId + cellId}
            onClick={() => onClick(rowId, cellId)}
          />
        ))}
      </div>
    ))}
  </div>
);

export { Board };
