import supertest from "supertest"
import { web } from "../src/application/web.js"
import { prismaClient } from "../src/application/database.js"
describe("POST /api/users",() => {

  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where : {
        username : "menzcreate"
      }
    })
  })
  it("should can register new user",async () => {
     const result = await supertest(web)
      .post("/api/users").send({
        username : "menzcreate",
        password : "rahasia",
        name : "Ilman s"
      })

      expect(result.status).toBe(200)
      expect(result.body.data.username).toBe("menzcreate")
      expect(result.body.data.name).toBe("Ilman s")
      expect(result.body.data.password).toBeUndefined();
  })
})