module.exports = {
  getHome: async (req, res) => {
    res.render("index", { year: new Date().getFullYear() });
  },
  getAbout: async (req, res) => {
    res.render("about", { year: new Date().getFullYear() });
  },
  getContact: async (req, res) => {
    res.render("contact", { year: new Date().getFullYear() });
  },
};
