import { useCallback, useEffect, useState } from "react";
import { Board } from "components/board";
import { ShipsStatus } from "components/shipsStatus";
import { boardSize } from "utils/consts";
import shipsJSON from "utils/ships.json";

const App = () => {
  const [board, setBoard] = useState();
  const [ships, setShips] = useState(shipsJSON.shipTypes); // size === hp

  const handleClick = useCallback(
    (rowId, cellId) => {
      const arr = [...board];
      const position = arr[rowId][cellId];

      if (position.ship) {
        if (!position.hit) {
          position.hit = true;
          const nextShips = { ...ships };
          const nextShip = nextShips[position.ship];
          if (!nextShip.hp) {
            nextShip.hp = nextShip.size;
          }
          nextShip.hp -= 1;
          setShips(nextShips);
        }
      } else {
        position.miss = true;
      }

      setBoard(arr);
    },
    [board, ships]
  );

  useEffect(() => {
    const next = Array.from({ length: boardSize }, () => {
      return Array.from({ length: boardSize }, () => ({
        ship: "",
        hit: false,
        miss: false,
      }));
    });

    const { layout } = shipsJSON;

    layout.forEach(({ ship, positions }) => {
      positions.forEach((position) => {
        const pos = next[position[0]][position[1]];
        pos.ship = ship;
        pos.hp = shipsJSON.shipTypes[ship].size;
      });
    });

    setBoard(next);
  }, []);

  return (
    <div className="app">
      <Board onClick={handleClick} board={board} />
      <ShipsStatus ships={ships} />
    </div>
  );
};

export default App;
