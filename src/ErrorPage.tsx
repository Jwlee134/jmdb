import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { motion } from "framer-motion";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ translateY: -100 }}
      animate={{ translateY: 0 }}
      transition={{
        repeat: Infinity,
        repeatDelay: 2,
        type: "spring",
        bounce: 0.8,
      }}
      className="flex justify-center items-center flex-col min-h-screen"
    >
      <h1 className="text-4xl mb-2">Oops!</h1>
      <p className="mb-4">Sorry, an unexpected error has occurred.</p>
      <h2 className="text-gray-400 text-center">
        {isRouteErrorResponse(error) ? (
          <>
            {error.status}: {error.statusText}
          </>
        ) : error instanceof Error ? (
          error.message
        ) : null}
        <div>
          What you can do:{" "}
          <span className="underline" onClick={() => navigate(-1)}>
            Go Back
          </span>
        </div>
      </h2>
    </motion.div>
  );
}
