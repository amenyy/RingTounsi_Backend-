describe("User API Tests", () => {
  // Helper function to create a new user
  let authToken;
  let userId;
  const createUser = () => {
    const user = {
      nom: "admin",
      prenom: "Doe",
      email: "admin.doe@example.com",
      password: "azazaz",
      confirm_password: "azazaz",
      date_inscription: "2023-11-13 00:05:30",
      role: "Admin",
    };

    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/v1/users",
      body: user,
      failOnStatusCode: false,
    }).then((response) => {
      // Assert that the server responded with a 201 status code (Created)
      expect(response.status).to.equal(201); // Update to expect 201 instead of 200
    });
  };

  // Helper function to log in a user
  const loginUser = () => {
    const credentials = {
      email: "admin.doe@example.com",
      password: "azazaz",
    };

    cy.request("POST", "http://localhost:3000/api/v1/users/login", credentials)
      .its("body")
      .then((body) => {
        authToken = body.token;
        userId = body.id;
        cy.wrap(authToken).as("adminAuthToken");
      });
  };

  it("should get all users", () => {
    //createUser(); // Create a user for testing

    // Use cy.request() to make a GET request
    cy.request({
      method: "GET",
      url: "http://localhost:3000/api/v1/users",
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
    }).then((response) => {
      // Assert the status code
      expect(response.status).to.equal(200);

      // Assert the body
      expect(response.body).to.be.an("array");
    });
  });

  it("should handle validation error when creating a user", () => {
    const user = {
      nom: "admin",
      prenom: "Doe",
      email: "admin.doe@example.com",
      password: "password123",
      confirm_password: "password123",
      date_inscription: "2023-11-13 00:05:30",
      role: "Admin",
    };

    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/v1/users",
      body: user,
      failOnStatusCode: false,
    }).then((response) => {
      // Assert that the server responded with a 400 status code
      expect(response.status).to.equal(400);

      // Assert the content type
      expect(response.headers["content-type"]).to.include("application/json");

      // Assert the response body contains the expected error message
      expect(response.body).to.have.property("type", "error");
      expect(response.body).to.have.property("status", 400);
      expect(response.body).to.have.property("message", "Validation faild");
      expect(response.body.errors).to.be.an("array");
      expect(response.body.errors).to.have.lengthOf(1);
      expect(response.body.errors[0]).to.deep.equal({
        value: "password123",
        msg: "Password can contain max 10 characters",
        param: "password",
        location: "body",
      });
    });
  });

  it("should handle registration with missing fields", () => {
    const incompleteUserData = {
      nom: "admin",
      prenom: "Doe",
    };

    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/v1/users",
      body: incompleteUserData,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal("Validation faild");
      expect(response.body.errors).to.deep.equal([
        {
          msg: "Email is required",
          param: "email",
          location: "body",
        },
        {
          msg: "Must be a valid email",
          param: "email",
          location: "body",
        },
        {
          msg: "Password is required",
          param: "password",
          location: "body",
        },
        {
          msg: "Invalid value",
          param: "password",
          location: "body",
        },
        {
          msg: "Password must contain at least 6 characters",
          param: "password",
          location: "body",
        },
        {
          msg: "Invalid value",
          param: "confirm_password",
          location: "body",
        },
      ]);
    });
  });

  it("should create a new user", () => {
    createUser();
  });

  it("should log in with correct credentials", () => {
    const validCredentials = {
      email: "wajdigridha744@gmail.com",
      password: "azazaz",
    };

    cy.request(
      "POST",
      "http://localhost:3000/api/v1/users/login",
      validCredentials
    )
      .its("status")
      .should("equal", 200);
  });

  it("should handle login failure with incorrect credentials", () => {
    const invalidCredentials = {
      email: "incorrect@example.com",
      password: "testazaz",
    };

    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/login",
      body: invalidCredentials,
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
    }).then((response) => {
      expect(response.status).to.equal(401); // Or any other expected status code for login failure
      expect(response.body.message).to.equal("Unable to login!");
    });
  });

  const updatedUserData = {
    // Provide the fields you want to update
    nom: "UpdatedName",
    prenom: "UpdatedLastName",
    email: "admin.doe@example.com",
    password: "azazaz",
    confirm_password: "azazaz",
    date_inscription: "2023-11-13 00:05:30",
    role: "Admin",
  };

  it("should update a user", () => {
    loginUser(); // Log in to get the authentication token

    // Use cy.wrap to persist the alias
    cy.wrap().then(() => {
      cy.get("@adminAuthToken").then((authToken) => {
        cy.request({
          method: "PATCH",
          url: `http://localhost:3000/api/v1/users/id/${userId}`,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: updatedUserData,
          failOnStatusCode: false,
        }).then((response) => {
          // Check the response status and handle accordingly
          expect(response.status).to.equal(200); // Or any other expected status code
        });
      });
    });
  });

  it("should delete a user", () => {
    loginUser(); // Log in to get the authentication token

    // Use cy.wrap to persist the alias
    cy.wrap().then(() => {
      cy.get("@adminAuthToken").then((authToken) => {
        cy.request({
          method: "DELETE",
          url: `http://localhost:3000/api/v1/users/id/${userId}`,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          failOnStatusCode: false,
        }).then((response) => {
          // Check the response status and handle accordingly
          expect(response.status).to.equal(200); // Or any other expected status code
        });
      });
    });
  });
});
