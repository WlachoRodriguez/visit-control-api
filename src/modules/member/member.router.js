import { Router } from "express";
import * as controller from "./member.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  memberSchema,
  memberQuerySchema,
} from "../../validations/member.schema.js";

const router = Router();

router.post("/", validate(memberSchema), controller.create);
router.get("/", validate(memberQuerySchema, "query"), controller.getMembers);
router.get("/:id", controller.getMemberById);
router.put("/:id", validate(memberSchema), controller.updateMember);
router.delete("/:id", controller.deleteMember);

export default router;
