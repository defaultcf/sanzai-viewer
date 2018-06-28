import { getPath, getCSV, calcDoughnut } from "../middlewares";

export const setSanzai = sanzai => ({
  type: "SET_SANZAI",
  data: sanzai,
});

export const setDoughnut = doughnut => ({
  type: "SET_DOUGHNUT",
  data: doughnut,
});

export const getSanzai = repo => {
  return async dispatch => {
    try {
      const csv_path = await getPath(repo);
      const sanzai = await getCSV(csv_path[0].url);
      await dispatch(setSanzai(sanzai));
      const sanzai_doughnut = await calcDoughnut(sanzai);
      await dispatch(setDoughnut(sanzai_doughnut));
    } catch(e) {
      alert(e.message);
    }
  }
};
