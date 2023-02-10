import { userMongoStore} from "./mongo/user-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userPostgresStore } from "./postgres/user-postgres-store.js";

export const db = {
  userStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo" :
        this.userStore = userMongoStore;
        connectMongo();
        break;
      case "postgres" :
        this.userStore = userPostgresStore;
        break;
      default :
        this.userStore = userMongoStore;
    }
  }
};
