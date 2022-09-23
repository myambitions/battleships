import classes from "./index.module.css";

const ShipsStatus = ({ ships }) => (
  <div className={classes.statuses}>
    {Object.entries(ships).map(([key, value]) => {
      const img = require(`assets/${key}.png`);

      const hpArray = Array.from({ length: value.size }, (_, i) => {
        const hpDiff = value.size - value.hp;

        if (i < hpDiff) {
          return "hit";
        }

        return "miss";
      });

      return (
        <div className={classes.ship} key={key}>
          <div className={classes.shipImg}>
            <img src={img} alt={key} />
          </div>
          <div className={classes.healthPoints}>
            {hpArray.map((status, id) => (
              <img
                key={id}
                src={require(`assets/${status}small.png`)}
                alt="hp"
                className={classes.shipHpImg}
              />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

export { ShipsStatus };
