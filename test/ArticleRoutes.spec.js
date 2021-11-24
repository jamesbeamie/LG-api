var expect = require("chai").expect;
var request = require("request");

const {
  createArticle,
  getArticles,
  getSpecificArticle,
  editArticle,
  deleteArticle,
} = require("../RouteHandlers/ArticleHandlers/articleHandlers");

const sampleArticle = {
  articles: [
    {
      likes: [
        {
          _id: "5f9254a897938c0f51c6b065",
          likeValue: 1,
          likedAt: "2020-10-23T03:57:28.836Z",
          __v: 0,
        },
      ],
      dislikes: [
        {
          _id: "5f9254f797938c0f51c6b067",
          dislikeValue: 1,
          dislikedAt: "2020-10-23T03:58:47.952Z",
          __v: 0,
        },
      ],
      comments: [
        {
          _id: "5f92557c97938c0f51c6b069",
          comment: "Very good services",
          commentedAt: "2020-10-23T04:01:00.862Z",
          __v: 0,
        },
      ],
      _id: "5f924ce8b0a6740cad578f27",
      name: "Beamer garage",
      location: "Karen",
      specialty: "BMW",
      workHours: "Any time except Sunday morning",
      mobile: "070000000",
      __v: 3,
    },
    {
      likes: [],
      dislikes: [],
      comments: [],
      _id: "5f925ba6782402129f2a0215",
      name: "Beamer garage",
      location: "Karen",
      specialty: "BMW",
      workHours: "Any time except Sunday morning",
      mobile: "070000000",
      __v: 0,
    },
    {
      likes: [],
      dislikes: [],
      comments: [
        {
          _id: "5f92a0bda5757e1a5ad1b8c1",
          comment: "Thank you so much",
          commentedAt: "2020-10-23T09:22:05.537Z",
          __v: 0,
        },
      ],
      _id: "5f92a032a5757e1a5ad1b8c0",
      name: "BMW center",
      location: "Ngong road",
      specialty: "BMW",
      workHours: "Any time except Sunday morning",
      mobile: "070000000",
      __v: 1,
    },
    {
      likes: [],
      dislikes: [],
      comments: [],
      _id: "5f92a151a5757e1a5ad1b8c3",
      name: "Juakali",
      location: "Kitale",
      specialty: "BMW",
      workHours: "Any time except Sunday morning",
      mobile: "070000000",
      __v: 0,
    },
  ],
};

describe("Test Articles CRUD", function () {
  describe("Test Retrieve articles", function () {
    var url = "http://localhost:5000/api/V1/articles";

    it("Returns status 200 on fetching all articles", function (done) {
      request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns an array of all the articles", function (done) {
      request(url, function (error, response, body) {
        // console.log("8*****", body);
        // expect(body).to.equal(sampleArticle);
        // expect(body).to.have.own.property("articles");
        expect(body).to.own.include("articles");
        // expect(body).to.equal(sampleArticle);
        done();
      });
    });
  });

  describe("Fetches a single article by id", function () {
    var url = "http://localhost:5000/api/V1/articles/5f92a032a5757e1a5ad1b8c0";
    var wrongIdUrl =
      "http://localhost:5000/api/V1/articles/5f92a032a5757e1a5ad1b8c55";

    it("returns status 200 for successfull retrieval", function (done) {
      request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    // it("returns status 404 for wrong ID", function (done) {
    //   request(wrongIdUrl, function (error, response, body) {
    //     console.log("hapa********", response);
    //     expect(response.statusCode).to.equal(404);
    //     done();
    //   });
    // });

    // it("returns status 404 for wrong ID", (done) => {
    //   request(wrongIdUrl)
    //     .then((res, response, body) => {
    //       console.log("hapa********", response);
    //       expect(response.statusCode).to.equal(404);
    //       done();
    //     })
    //     .catch(done);
    // });

    it("returns the fetched article", function (done) {
      request(url, function (error, response, body) {
        expect(body).to.own.include("article");
        done();
      });
    });
  });
});
