import { AclList } from "./router/types";
import {
  back,
  brb,
  punchIn,
  punchOut,
  register,
  timesheet,
  leave,
} from "./commands";

const ADMIN = "admin";
const USER = "user";
const ANY = "any";

const Acl: AclList = Object.freeze({
  in: {
    exec: punchIn,
    allowed: [ADMIN, USER],
  },
  out: {
    exec: punchOut,
    allowed: [ADMIN, USER],
  },
  brb: {
    exec: brb,
    allowed: [ADMIN, USER],
  },
  back: {
    exec: back,
    allowed: [ADMIN, USER],
  },
  register: {
    exec: register,
    allowed: [ADMIN, USER, ANY],
  },
  timesheet: {
    exec: timesheet,
    allowed: [ADMIN, USER, ANY],
  },
  leave: {
    exec: leave,
    allowed: [ADMIN, USER],
  },
});

module.exports = Acl;
