import { createConnection } from "typeorm";

createConnection({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: ["dist/db/entity/**/*.{js,ts}"],
})
  .then(async (connection) => {
    console.log("Connected DB");
  })
  .catch((error) => console.log(error));
