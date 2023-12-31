import supertest from "supertest";
import testUtil from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
  });
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

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("teskeren@gmail.com");
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

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
    await testUtil.createTestContact();
  });
  afterEach(async () => {
    await testUtil.removeAllTestContacts();
    await testUtil.removeTestUser();
  });

  it("Should can get contact", async () => {
    const testContact = await testUtil.getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.phone).toBe(testContact.phone);
    expect(result.body.data.email).toBe(testContact.email);
  });

  it("should return 404 if contact not found", async () => {
      const testContact = await testUtil.getTestContact();
    const result = await supertest(web)
      .get("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
    await testUtil.createTestContact();
  });
  afterEach(async () => {
    await testUtil.removeAllTestContacts();
    await testUtil.removeTestUser();
  });

  it("Should can update existing contact", async () => {
    const testContact = await testUtil.getTestContact();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "Ijmal",
        last_name: "ramdan",
        email: "Ijmalramdan@gmail.com",
        phone: "234234234323",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("Ijmal");
    expect(result.body.data.last_name).toBe("ramdan");
    expect(result.body.data.email).toBe("Ijmalramdan@gmail.com");
    expect(result.body.data.phone).toBe("234234234323");
  });
  it("Should reject if request invalid", async () => {
    const testContact = await testUtil.getTestContact();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "ramdan",
        email: "Ijmalramdan",
        phone: "234234234323",
      });

    expect(result.status).toBe(400);
  });
  it("Should reject if contact doesn't found", async () => {
    const testContact = await testUtil.getTestContact();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test")
      .send({
        first_name: "Ijmal",
        last_name: "ramdan",
        email: "Ijmalramdan@gmail.com",
        phone: "234234234323",
      });

    expect(result.status).toBe(404);
  });
});
describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
    await testUtil.createTestContact();
  });
  afterEach(async () => {
    await testUtil.removeAllTestContacts();
    await testUtil.removeTestUser();
  });

  it("Should can DELETE existing contact", async () => {
    let testContact = await testUtil.getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
    testContact = await testUtil.getTestContact();
    expect(testContact).toBeNull;
  });
  it("Should reject Delete contact", async () => {
    const contactt = await testUtil.getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + (contactt.id + 2))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await testUtil.createUserTest();
    await testUtil.createManyTestContacts();
  });
  afterEach(async () => {
    await testUtil.removeAllTestContacts();
    await testUtil.removeTestUser();
  });

  it("Should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("Should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });
  it("Should can search by name", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        name: "test 1",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(7);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(7);
  });
  it("Should can search by email", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        email: "test1",
      })
      .set("Authorization", "test");
    console.log(result.body.data);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(7);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(7);
  });
  it("Should can search by email", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        email: "test1",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(7);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(7);
  });
  it("Should can search by phone", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        phone: "232343234231",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(7);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(7);
  });
});
