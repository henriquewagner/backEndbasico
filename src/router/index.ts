import { Router } from "express";

import { usuarioRoute } from "./router.user";

const router = Router()

router.use("/user", usuarioRoute);

export {router};
