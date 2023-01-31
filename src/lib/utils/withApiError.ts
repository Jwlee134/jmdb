import axios from "axios";

const withApiError =
  <T, K>(f: (...arg: T[]) => Promise<K>) =>
  async (...arg: T[]) => {
    try {
      const res = await f(...arg);
      return res;
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) throw Error(e.message);
    }
  };

export default withApiError;
