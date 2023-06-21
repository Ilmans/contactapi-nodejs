import supertest from "supertest";
import testUtil from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
  beforeEach(testUtil.createUserTest);
  afterEach(async () => {
    await testUtil.removeAllTestContacts();
    await testUtil.removeTestUser();
  });

  it("Should be able to create contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "teskeren@gmail.com",
        phone: "080900000",
      });

    
      expect(result.status).toBe(200)
      expect(result.body.data.id).toBeDefined()
      expect(result.body.data.first_name).toBe("test")
      expect(result.body.data.last_name).toBe("test")
      expect(result.body.data.email).toBe("teskeren@gmail.com")
      expect(result.body.data.phone).toBe("080900000");

      
  });

  it("Should reject if request is valid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "test",
        email: "teskerengmail.com",
        phone: "22432423423423423",
      });

    
      expect(result.status).toBe(400)
      expect(result.body.errors).toBeDefined()
   


  });
});
