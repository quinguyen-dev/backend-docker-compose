import express, { NextFunction } from "express";
import type { Express, Request, Response } from "express";
import { usersRouter } from "./routes/users";
import createError, { HttpError } from "http-errors";

const app: Express = express();

/* Health check */
app.get("/", async (_, res: Response, next: NextFunction) => {
  try {
    res.sendStatus(204);
  } catch (err) {
    next(createError(400, "Critical issue: Endpoint not found."));
  }
});

/* Setup routers */
app.use("/users", usersRouter);

/* Error handler middleware */
app
  .use(async (req: Request, res: Response, next: NextFunction) => {
    next(createError(404, "Resource not found."));
  })
  .use((err: HttpError, _: Request, res: Response) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  });

/* Port binding */
const port = process.env.BACKEND_PORT || 3001;
app.listen(port, () => {
  console.log(`API is running on ${port}`);
});
