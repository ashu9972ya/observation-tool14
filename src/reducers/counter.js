import { UPDATE_COUNT_DATA } from "../actions/types";

const countDataGlobal = {};

export default function (state = countDataGlobal, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_COUNT_DATA:
      return {
        countDataGlobal: payload,
      };

    default:
      return state;
  }
}
