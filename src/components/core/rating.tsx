import { For, Match, Switch, createMemo } from "solid-js";
import { RatingComponent } from "./rating.types";
import FontAwesomeIcon from "../images/fontAwesomeIcon";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

const Rating: RatingComponent = (props) => {
  const rating = createMemo<number[]>(() => {
    const value = (props.value || 0).toFixed(1);
    const valueStr = value.toString();
    const split = valueStr.split(".");
    const int = Number.parseInt(split[0], 10);
    const precision = Number.parseFloat(`0.${split[1]}`);
    console.log(precision);

    return Array.from({ length: 10 }, (_, i) => {
      if (i < int) {
        return 1;
      } else if (i === int && precision >= 0.5) {
        return 0.5;
      }

      return 0;
    });
  });

  return (
    <div class="flex items-center">
      <For each={rating()}>
        {(i) => (
          <Switch>
            <Match when={i === 1}>
              <FontAwesomeIcon class="text-fuchsia-500" icon={faStar} />
            </Match>
            <Match when={i === 0.5}>
              <FontAwesomeIcon class="text-fuchsia-500" icon={faStarHalfAlt} />
            </Match>
            <Match when={i === 0}>
              <FontAwesomeIcon class="text-fuchsia-500" icon={faStarEmpty} />
            </Match>
          </Switch>
        )}
      </For>
      <span class="ml-2 text-sm">({props.value?.toFixed(2)})</span>
    </div>
  );
};

export default Rating;
