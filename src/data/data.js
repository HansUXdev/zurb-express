// ===============================================================================
// DATA
// Below data will hold all of the reserved tables.
// Initially we just set it equal to a "dummy" customer.
// But you could have it be an empty array as well.
// ===============================================================================

var data = {
  pages: {
    home: {
      meta: [
        {
          title: "/portfolio",
          keywords: "portfolio",
          description: "Hans McMurdy's Web Resume and portfolio. Front-end Developer.",
          author: "Hans McMurdy"
        },
      ],
      scripts:[
        'app.js'
      ],
      styles:[
        'app.css'
      ],
    },
  },  
  templates: [
    {
      url: "/portfolio",
      name: "portfolio"
    },
    {
      url: "/news",
      name: "news"
    },
    {
      url: "/real-estate",
      name: "real-estate"
    },
    {
      url: "/blog",
      name: "blog"
    },
    {
      url: "/blog-simple",
      name: "blog-simple"
    },
    {
      url: "/ecommerce",
      name: "ecommerce"
    }, 
    {
      url: "/portfolio",
      name: "portfolio"
    }
  ],
};




// Note how we export the array. This makes it accessible to other files using require.
module.exports = data;
