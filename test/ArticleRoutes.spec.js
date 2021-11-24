var expect = require("chai").expect;
var request = require("request");

const {
  createArticle,
  getArticles,
  getSpecificArticle,
  editArticle,
  deleteArticle,
} = require("../RouteHandlers/ArticleHandlers/articleHandlers");

describe("Test Articles CRUD", () => {
  describe("Test Retrieve articles", () => {
    var url = "http://localhost:5000/api/V1/articles";

    it("Returns status 200 on fetching all articles", (done) => {
      request(url, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns an array of all the articles", (done) => {
      request(url, (error, response, body) => {
        expect(body).to.own.include("articles");
        done();
      });
    });
  });

  describe("Fetches a single article by id", () => {
    var url = "http://localhost:5000/api/V1/articles/5f92a032a5757e1a5ad1b8c0";
    var wrongIdUrl =
      "http://localhost:5000/api/V1/articles/5f92a032a5757e1a5ad1b8c55";

    it("returns status 200 for successfull retrieval", (done) => {
      request(url, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it("returns status 404 for wrong ID", function (done) {
      request(wrongIdUrl, function (error, response, body) {
        console.log("hapa********", response);
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it("returns status 404 for wrong ID", (done) => {
      request(wrongIdUrl)
        .then((res, response, body) => {
          console.log("hapa********", response);
          expect(response.statusCode).to.equal(404);
          done();
        })
        .catch(done);
    });

    it("returns the fetched article", (done) => {
      request(url, (error, response, body) => {
        expect(body).to.own.include("article");
        done();
      });
    });
  });
});
