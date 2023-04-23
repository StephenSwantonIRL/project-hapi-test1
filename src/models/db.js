import { userPostgresStore } from "./postgres/user-postgres-store.js";
import { sessionPostgresStore } from "./postgres/session-postgres-store.js";
import { questionPostgresStore } from "./postgres/question-postgres-store.js";

export const db = {
  userStore: null,
  sessionStore: null,

  init(storeType) {
    switch (storeType) {
      case "postgres" :
        this.userStore = userPostgresStore;
        this.sessionStore = sessionPostgresStore;
        this.questionStore = questionPostgresStore;
        break;
      default :
        this.userStore = userPostgresStore;
        this.sessionStore = sessionPostgresStore;
        this.questionStore = questionPostgresStore;
    }
  }
};
