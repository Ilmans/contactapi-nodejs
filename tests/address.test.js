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
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Jalan test");
    expect(result.body.data.city).toBe("City test");
    expect(result.body.data.province).toBe("Province test");
    expect(result.body.data.country).toBe("Indonesia");
    expect(result.body.data.postal_code).toBe("16640");
  });
});

describe("GET /api/contacts/:contactId/adresses/:adressId", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
    await testUtil.createTestContact();
    await testUtil.createTestAddress();
  });
  afterEach(async () => {
    await testUtil.removeAllTestAddresses();
    await testUtil.removeAllTestContacts();
    await testUtil.removeTestUser();
  });

  it("Should can get adress by Id", async () => {
    const testContact = await testUtil.getTestContact();
    const testAddress = await testUtil.getTestAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/adresses/${testAddress.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Jalan test");
    expect(result.body.data.city).toBe("City test");
    expect(result.body.data.province).toBe("Province test");
    expect(result.body.data.country).toBe("Indonesia");
    expect(result.body.data.postal_code).toBe("16640");
  });
  it("Should reject if contact doesn't found", async () => {
    const testContact = await testUtil.getTestContact();
    const testAddress = await testUtil.getTestAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/adresses/${testAddress.id}1`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
    await testUtil.createTestContact();
    await testUtil.createTestAddress();
  });
  afterEach(async () => {
    await testUtil.removeAllTestAddresses();
    await testUtil.removeAllTestContacts();
    await testUtil.removeTestUser();
  });

  it("Should can update address", async () => {
    const testContact = await testUtil.getTestContact();
    const testAddress = await testUtil.getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        street: "Jalan testupdate",
        city: "City testupdate",
        province: "Province testupdate",
        country: "Indonesiaa",
        postal_code: "166401",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("Jalan testupdate");
    expect(result.body.data.city).toBe("City testupdate");
    expect(result.body.data.province).toBe("Province testupdate");
    expect(result.body.data.country).toBe("Indonesiaa");
    expect(result.body.data.postal_code).toBe("166401");
  });
  it("Should reject update address because wrong validation", async () => {
    const testContact = await testUtil.getTestContact();
    const testAddress = await testUtil.getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        street: "Jalan testupdate",
        city: "City testupdate",
        province: "Province testupdate",
        postal_code: "166401",
      });
    expect(result.status).toBe(400);
  });
});
