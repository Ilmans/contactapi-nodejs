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
  it("should reject if request invalid",async () => {
     const result = await supertest(web)
      .post("/api/users").send({
        username : "",
        password : "",
        name : ""
      })

      expect(result.status).toBe(400)
      expect(result.body.errors).toBeDefined();
  })
})