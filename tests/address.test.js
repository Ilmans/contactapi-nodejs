import supertest from "supertest";
import testUtil from "./test-util.js";

import { web } from "../src/application/web";

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
    await testUtil.createTestContact();
  });
  afterEach(async () => {
    await testUtil.removeAllTestAddresses();
    await testUtil.removeAllTestContacts();
    await testUtil.removeTestUser();
  });

  it("Should can create a new address", async () => {
    const testContact = await testUtil.getTestContact();
    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test")
      .send({
        street: "Jalan test",
        city: "City test",
        province: "Province test",
        country: "Indonesia",
        postal_code: "16640",
      });
    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Jalan test");
    expect(result.body.data.city).toBe("City test");
    expect(result.body.data.province).toBe("Province test");
    expect(result.body.data.country).toBe("Indonesia");
    expect(result.body.data.postal_code).toBe("16640");
  });
});
