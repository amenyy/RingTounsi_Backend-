const request = require("supertest");
const app = require("../server");

describe("GET /api/v1/users/", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/v1/users/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});

describe("POST /api/v1/users/", () => {
  it("should create a new user", async () => {
    const newUser = {
      nom: "wajdi",
      prenom: "gridha",
      email: "wajdi.gridha@example.com",
      password: "test",
      date_inscription: "10-10-2023 09:10:00",
      role: "Coach",
    };

    const response = await request(app).post("/api/v1/users/").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nom).toBe(newUser.nom);
    expect(response.body.prenom).toBe(newUser.prenom);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.password).toBe(newUser.password);
    expect(response.body.date_inscription).toBe(newUser.date_inscription);
    expect(response.body.role).toBe(newUser.role);

    const createdUser = await User.findOne({ email: newUser.email });
    expect(createdUser).toBeDefined();
    expect(createdUser.nom).toBe(newUser.nom);
  });
});
