const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3001;
const API_BASE_URL = "https://api.mercadolibre.com";

const AUTHOR_NAME = "Juan";
const AUTHOR_LASTNAME = "Izquierdo";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const getCategories = (filters) => {
  const categoryFilter = filters.find((filter) => filter.id === "category");

  if (!categoryFilter || !categoryFilter.values.length) {
    return [];
  }

  const categoryCounts = {};
  let mostFrequentCategory = "";
  let maxCount = 0;

  categoryFilter.values[0].path_from_root.forEach((category) => {
    const categoryName = category.name;
    categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;

    if (categoryCounts[categoryName] > maxCount) {
      mostFrequentCategory = categoryName;
      maxCount = categoryCounts[categoryName];
    }
  });

  return [mostFrequentCategory];
};

app.get("/api/items", (req, res) => {
  const query = req.query.q;

  axios
    .get(`${API_BASE_URL}/sites/MLA/search?q=${query}`)
    .then((response) => {
      const data = response.data;

      const formattedResponse = {
        author: {
          name: AUTHOR_NAME,
          lastname: AUTHOR_LASTNAME,
        },
        categories: getCategories(data.filters),
        items: data.results.slice(0, 4).map((item) => ({
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: item.decimals,
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          seller_address1: item.seller_address.state.name,
        })),
      };

      res.json(formattedResponse);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al consultar los resultados" });
    });
});

app.get("/api/items/:id", (req, res) => {
  const id = req.params.id;

  axios
    .all([
      axios.get(`${API_BASE_URL}/items/${id}`),
      axios.get(`${API_BASE_URL}/items/${id}/description`),
    ])
    .then(
      axios.spread((itemResponse, descriptionResponse) => {
        const itemData = itemResponse.data;
        const descriptionData = descriptionResponse.data;
        const categoryId = itemData.category_id;

        axios
          .get(`${API_BASE_URL}/categories/${categoryId}`)
          .then((categoryResponse) => {
            const categoryData = categoryResponse.data;
            const breadcrumb = categoryData.path_from_root.map(
              (category) => category.name
            );

            const formattedResponse = {
              author: {
                name: AUTHOR_NAME,
                lastname: AUTHOR_LASTNAME,
              },
              item: {
                id: itemData.id,
                title: itemData.title,
                price: {
                  currency: itemData.currency_id,
                  amount: itemData.price,
                  decimals: itemData.decimals,
                },
                picture: itemData.thumbnail,
                condition: itemData.condition,
                free_shipping: itemData.shipping.free_shipping,
                sold_quantity: itemData.sold_quantity,
                description: descriptionData.plain_text,
                breadcrumb: breadcrumb,
              },
            };

            res.json(formattedResponse);
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .json({ error: "Error al consultar los resultados" });
          });
      })
    )
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error al consultar los resultados" });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
