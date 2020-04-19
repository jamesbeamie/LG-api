const {
  createArticle,
  getArticles,
  getSpecificArticle,
  editArticle,
  deleteArticle,
} = require("../../RouteHandlers/ArticleHandlers/articleHandlers");

// creating an article
describe("Test creating an article", () => {
  it("Should test createArticle handler exists", () => {
    expect(createArticle()).toBeTruthy();
  });
  it("Should return status code 401 for unauthorized users", async () => {});
  it("Should return authorization message for unauthenticated user", async () => {});
  it("Should return status code 201 after creating", async () => {});
  it("Should return a created article", async () => {});
});

//tests geting all articles
describe("Test getting articles", () => {
  it("Should test getArticles handler exists", () => {
    expect(getArticles()).toBeTruthy();
  });
  it("Should return a data object with an array of articles", async () => {
    // expect(getArticles()).toEqual({});
  });
  it("Should return a status code of 200 for success", async () => {});
  it("Should return status code of 404 for articles not fond", async () => {});
});

//tests getting a specific articke
describe("Test getting a specific article", () => {
  it("Should test getSpecificArticle handler exists", () => {
    expect(getSpecificArticle()).toBeTruthy();
  });
  it("Should return an a success message", async () => {});
  it("Should return an object of the specific article", async () => {});
  it("Should return a status code of 200 for success", async () => {});
  it("Should return a message for unavailable article", async () => {});
  it("Should return status code 404 for unavailable article", async () => {});
});

// test editing an article
describe("Test editing an article", () => {
  it("Should test editArticle handler exists", () => {
    expect(editArticle()).toBeTruthy();
  });
  it("Should return status code 200 after updating", async () => {});
  it("Should return a success message on updating", async () => {});
  it("Should retunr authentication error message", async () => {});
  it("Should return authentication status code 401", async () => {});
  it("Should return error message for unavailable article", async () => {});
  it("Should return status code 404 for unavailable article", async () => {});
});

// test deleting an article
describe("Test deleting an article", () => {
  it("Should test deleteArticle handler exists", () => {
    expect(deleteArticle()).toBeTruthy();
  });
  it("Should return status code 200 after deleting", async () => {});
  it("Should return a success message on deleting", async () => {});
  it("Should retunr authentication error message", async () => {});
  it("Should return authentication status code 401", async () => {});
  it("Should return error message for unavailable article", async () => {});
  it("Should return status code 404 for unavailable article", async () => {});
});
