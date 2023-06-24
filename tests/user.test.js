import supertest from "supertest"
import { web } from "../src/application/web.js"
import testUtil from "./test-util.js";
import bcrypt from "bcrypt";
describe("POST /api/users", () => {
  afterEach(async () => {
    await testUtil.removeTestUser();
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
  it("should reject register cause empty field", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeUndefined;
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
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
  });
  afterEach(async () => {
    await testUtil.removeTestUser();
  });

  it("should can be login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "menzcreate",
      password: "rahasia",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("should can't be login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "menzcreate",
      password: "rahasiaasdf",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
  });
  afterEach(async () => {
    await testUtil.removeTestUser();
  });
  it("should can get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("menzcreate");
    expect(result.body.data.name).toBe("Ilman S");
  });
  it("should rejet if token login is invalid", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "asdfasd");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PETCH /api/users/current", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
  });
  afterEach(async () => {
    await testUtil.removeTestUser();
  });
  it("should can update user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "Ilman s 2",
        password: "rahasialagi",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("menzcreate");
    expect(result.body.data.name).toBe("Ilman s 2");
    const user = await testUtil.getUserTest();
    expect(bcrypt.compareSync("rahasialagi", user.password)).toBe(true);
  });
  it("should can update only username", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "Ilman s 2",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("menzcreate");
    expect(result.body.data.name).toBe("Ilman s 2");
  });
  it("should can update only password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "rahasialagi",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("menzcreate");
    const user = await testUtil.getUserTest();
    expect(bcrypt.compareSync("rahasialagi", user.password)).toBe(true);
  });

  it("should be reject if request not valid", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "salah")
      .send({});
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/users/logout", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
  });
  afterEach(async () => {
    await testUtil.removeTestUser();
  });
  it("should can be logout", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    const user = await testUtil.getUserTest();

    expect(user.token).toBeNull();
  });

  it("should reject logout if token is invalid", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "salah");
    expect(result.status).toBe(401);
  });
});



