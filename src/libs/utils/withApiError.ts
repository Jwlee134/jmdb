import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";

/* 
  TODO: QueryKey 배열의 첫 번째 원소에 따라 두 번째 원소의 타입이 결정
*/

const withApiError =
  <T>(f: (arg: QueryFunctionContext) => Promise<T>) =>
  (arg: QueryFunctionContext) =>
    f(arg)
      .then((res) => res)
      .catch((e) => {
        console.error(e);
        if (axios.isAxiosError(e)) throw new Error(e.message);
        return null;
      });

export default withApiError;
