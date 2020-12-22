const stripe = require("stripe")("sk_test_bUemrYIJEk13xl6EBhbNgI7R00DxirciEt");
const uuid = require("uuid/v4");

exports.makepayment = (req, rs) => {
  //
  const { products, token } = req.body;

  console.log("PRODUCTS:", products);

  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });

  const idempotemcyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customers) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotemcyKey: idempotemcyKey }
        )
        .then((result) => result.status(200).json(result))
        .catch((error) => console.log(error));
    });
};
