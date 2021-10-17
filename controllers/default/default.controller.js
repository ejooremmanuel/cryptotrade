module.exports = {
  getHome: async (req, res) => {
    res.render("index", { year: new Date().getFullYear() });
  },
};
