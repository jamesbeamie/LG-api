// const {
//   createArticle,
//   getArticles,
//   getSpecificArticle,
//   editArticle,
//   deleteArticle,
// } = require("../../RouteHandlers/ArticleHandlers/articleHandlers");

// describe("Articles", () => {
//   it("should check whether an article was created successfully", () => {
//     expect(true).toBe(true);
//   });
// });

// describe("getArticles", () => {
//   it("test data assertion", async () => {
//     const data = "James";
//     expect(data).toEqual("James");
//   });
// });

// describe("Test creating an article", () => {
//   it("Should return status code 401 for unauthorized users", async () => {});
//   it("Should return authorization message for unauthenticated user", async () => {});
//   it("Should return status code 201 after creating", async () => {});
//   it("Should return a created article", async () => {});
// });

// describe("Test getting articles", () => {
//   it("Should return array of articles", async () => {});
//   it("Should return a status code of 200 for success", async () => {});
//   it("Should return status code of 404 for articles not fond", async () => {});
// });

// describe("Test getting a specific article", () => {
//   it("Should return an a success message", async () => {});
//   it("Should return an object of the specific article", async () => {});
//   it("Should return a status code of 200 for success", async () => {});
//   it("Should return a message for unavailable article", async () => {});
//   it("Should return status code 404 for unavailable article", async () => {});
// });

// describe("Test editing an article", () => {
//   it("Should return status code 200 after updating", async () => {});
//   it("Should return a success message on updating", async () => {});
//   it("Should retunr authentication error message", async () => {});
//   it("Should return authentication status code 401", async () => {});
//   it("Should return error message for unavailable article", async () => {});
//   it("Should return status code 404 for unavailable article", async () => {});
// });

// describe("Test deleting an article", () => {
//   it("Should return status code 200 after deleting", async () => {});
//   it("Should return a success message on deleting", async () => {});
//   it("Should retunr authentication error message", async () => {});
//   it("Should return authentication status code 401", async () => {});
//   it("Should return error message for unavailable article", async () => {});
//   it("Should return status code 404 for unavailable article", async () => {});
// });

var expect = require("chai").expect;
var request = require("request");

const {
  createArticle,
  getArticles,
  getSpecificArticle,
  editArticle,
  deleteArticle,
} = require("../../RouteHandlers/ArticleHandlers/articleHandlers");

describe("Articles", function () {
  describe("Get all articles", function () {
    var url = "http://localhost:5000/api/V1/articles";

    it("returns status 200 on fetching all articles", function (done) {
      request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns the color in hex", function (done) {
      request(url, function (error, response, body) {
        expect(body).to.equal("ffffff");
        done();
      });
    });
  });

  describe("Hex to RGB conversion", function () {
    var url = "http://localhost:5000/api/V1/articles";

    it("returns status 200", function (done) {
      request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns the color in RGB", function (done) {
      request(url, function (error, response, body) {
        expect(body).to.equal("[0,255,0]");
        done();
      });
    });
  });
});
