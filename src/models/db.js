import { userPostgresStore } from "./postgres/user-postgres-store.js";
import { sessionPostgresStore } from "./postgres/session-postgres-store.js";
import { questionPostgresStore } from "./postgres/question-postgres-store.js";
import { mcqPostgresStore } from "./postgres/mcq-postgres-store.js";

export const db = {
  userStore: null,
  sessionStore: null,
  questionStore: null,
  mcqStore: null,

  init(storeType) {
    switch (storeType) {
      case "postgres" :
        this.userStore = userPostgresStore;
        this.sessionStore = sessionPostgresStore;
        this.questionStore = questionPostgresStore;
        this.mcqStore = mcqPostgresStore;
        break;
      default :
        this.userStore = userPostgresStore;
        this.sessionStore = sessionPostgresStore;
        this.questionStore = questionPostgresStore;
        this.mcqStore = mcqPostgresStore;
    }
  }
};
