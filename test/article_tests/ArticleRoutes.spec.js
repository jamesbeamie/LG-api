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
