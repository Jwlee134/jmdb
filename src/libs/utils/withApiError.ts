import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";

const withApiError =
  <T>(f: (arg: QueryFunctionContext) => Promise<T>) =>
  (arg: QueryFunctionContext) =>
    f(arg)
      .then((res) => res)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          throw new Error(
            e.response?.data?.["status_message"] || "Something's wrong."
          );
        }
        throw new Error("Something's wrong.");
      });

export default withApiError;
