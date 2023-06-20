import supertest from "supertest"
import { web } from "../src/application/web.js"
import { prismaClient } from "../src/application/database.js"
import { logger } from "../src/application/logging.js";
describe("POST /api/users",() => {

  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where : {
        username : "menzcreate"
      }
    })
  })

  it("should reject register cause empty field", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeUndefined;
  });
  it("should can register new user", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "menzcreate",
      password: "rahasia",
      name: "Ilman s",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("menzcreate");
    expect(result.body.data.name).toBe("Ilman s");
    expect(result.body.data.password).toBeUndefined();
  });
  it("should reject register because duplicate user", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "menzcreate",
      password: "rahasia",
      name: "Ilman s",
    });
     

     result = await supertest(web).post("/api/users").send({
      username: "menzcreate",
      password: "rahasia",
      name: "Ilman s",
    });
     

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined()
  
  });
  
})