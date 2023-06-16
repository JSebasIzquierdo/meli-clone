const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/items", (req, res) => {
  const query = req.query.q;

  // Consultar el endpoint de MercadoLibre
  axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
    .then((response) => {
      console.log("response", response);
      const data = response.data;

      // Formatear los resultados según el formato indicado
      const formattedResponse = {
        author: {
          name: "Juan",
          lastname: "Izquierdo",
        },
        categories: data.filters
          .find((filter) => filter.id === "category")
          ?.values[0].path_from_root.map((category) => category.name),
        items: data.results.slice(0, 4).map((item) => ({
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: Math.floor(item.price),
            decimals:
              item.price % 1 === 0
                ? 0
                : Number(item.price.toString().split(".")[1]),
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
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

  // Consultar los endpoints de MercadoLibre
  axios
    .all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`),
    ])
    .then(
      axios.spread((itemResponse, descriptionResponse) => {
        const itemData = itemResponse.data;
        const descriptionData = descriptionResponse.data;

        // Formatear los resultados según el formato indicado
        const formattedResponse = {
          author: {
            name: "Juan",
            lastname: "Izquierdo",
          },
          item: {
            id: itemData.id,
            title: itemData.title,
            price: {
              currency: itemData.currency_id,
              amount: Math.floor(itemData.price),
              decimals:
                itemData.price % 1 === 0
                  ? 0
                  : Number(itemData.price.toString().split(".")[1]),
            },
            picture: itemData.thumbnail,
            condition: itemData.condition,
            free_shipping: itemData.shipping.free_shipping,
            sold_quantity: itemData.sold_quantity,
            description: descriptionData.plain_text,
          },
        };

        res.json(formattedResponse);
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
