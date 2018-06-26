import { getPath, getCSV } from "../middlewares";

export const setSanzai = sanzai => ({
  type: "SET_SANZAI",
  data: sanzai,
})

export const getSanzai = repo => {
  return async dispatch => {
    try {
      const csv_path = await getPath(repo);
      const sanzai = await await getCSV(csv_path[0].url);
      await dispatch(setSanzai(sanzai));
    } catch(e) {
      alert(e);
    }
  }
};

