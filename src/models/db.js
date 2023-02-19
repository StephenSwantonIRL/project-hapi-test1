import { userPostgresStore } from "./postgres/user-postgres-store.js";
import { sessionPostgresStore} from "./postgres/session-postgres-store.js";

export const db = {
  userStore: null,
  sessionStore: null,

  init(storeType) {
    switch (storeType) {
      case "postgres" :
        this.userStore = userPostgresStore;
        this.sessionStore = sessionPostgresStore;
        break;
      default :
        this.userStore = userPostgresStore;
        this.sessionStore = sessionPostgresStore;
    }
  }
};
