import { userPostgresStore } from "./postgres/user-postgres-store.js";
import { sessionPostgresStore } from "./postgres/session-postgres-store.js";
import { questionPostgresStore } from "./postgres/question-postgres-store.js";
import { mcqPostgresStore } from "./postgres/mcq-postgres-store.js";
import { openPostgresStore } from "./postgres/open-postgres-store.js";


export const db = {
  userStore: null,
  sessionStore: null,
  questionStore: null,
  mcqStore: null,
  openStore: null,

  init(storeType) {
    switch (storeType) {
      case "postgres" :
        this.userStore = userPostgresStore;
        this.sessionStore = sessionPostgresStore;
        this.questionStore = questionPostgresStore;
        this.mcqStore = mcqPostgresStore;
        this.openStore = openPostgresStore;
        break;
      default :
        this.userStore = userPostgresStore;
        this.sessionStore = sessionPostgresStore;
        this.questionStore = questionPostgresStore;
        this.mcqStore = mcqPostgresStore;
        this.openStore = openPostgresStore;
    }
  }
};
