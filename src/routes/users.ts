import { NextFunction, Router } from "express";
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import createError from "http-errors";

const usersRouter: Router = Router();
const prismaClient = new PrismaClient();

/* Testing endpoint for users. Returns 200 if successful. */
usersRouter.get("/", async (_, res: Response, next: NextFunction) => {
  try {
    res.sendStatus(204);
  } catch (err) {
    next(createError(400, "Critical issue: Endpoint not found."));
  }
});

/* Get information on a specific user (through username) */
usersRouter.get(
  "/:username",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await prismaClient.user.findUniqueOrThrow({
        where: {
          username: req.params.username,
        },
      });

      res.send(user);
    } catch (err) {
      next(
        createError(
          404,
          `Resource not found at /api/users/${req.params.userId}.`
        )
      );
    }
  }
);

/* Create a new user */
usersRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await prismaClient.user.create({
        data: {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      });

      res.header(`/users/${user.userId}`).status(201).send(user);
    } catch (err) {
      next(createError(409, `Unable to create resource.`));
    }
  }
);

export { usersRouter };
