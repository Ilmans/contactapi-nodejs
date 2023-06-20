import supertest from "supertest"
import { web } from "../src/application/web.js"
import testUtil from "./test-util.js";
import { logger } from "../src/application/logging.js";
describe("POST /api/users",() => {

  afterEach(testUtil.removeTestUser);

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

describe("POST /api/users/login",() => {
  beforeEach(testUtil.createUserTest);
  afterEach(testUtil.removeTestUser);

  it("should can be login",async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username : "menzcreate",
      password : "rahasia"
    })
   
  logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");  

  })

  it("should can't be login",async () => {
       const result = await supertest(web).post("/api/users/login").send({
         username: "menzcreate",
         password: "rahasiaasdf",
       });

       expect(result.status).toBe(401);
       expect(result.body.errors).toBeDefined()
  })
})