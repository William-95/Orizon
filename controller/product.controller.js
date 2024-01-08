const pool = require("../config/database");
const { body, validationResult } = require("express-validator");

const productController = {
  // read
  read: (req, res) => {
    try {
      pool.query("select*from product", (err, result, fields) => {
        if (err) {
          return console.log(err);
        }
        return res.status(200).json({
          metadata: {
            success: true,
            message: "Lista prodotti pronta alla lettura",
          },
          data: result,
        });
      });
    } catch (error) {
      res.status(500).json({
        metadata: {
          success: false,
          message: "Lista prodotti non disponibile",
        },
        data: error,
      });
    }
  },

  //   create
  create: [
    body("name").escape(),
    (req, res) => {
      try {
        // validator body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        pool.query(
          `insert into product(name) values(?)`,
          [req.body.name],
          (err, result, fields) => {
            if (err) {
              return console.log(err);
            }
            return res.status(200).json({
              metadata: {
                success: true,
                message: "Prodotto inserito correttamente",
              },
              data: req.body,
              status: result,
            });
          }
        );
      } catch (error) {
        res.status(500).json({
          metadata: {
            success: false,
            message: "Prodotto non inserito",
          },
          data: error,
        });
      }
    },
  ],
  //   update
  update: [
    body("name").escape(),
    (req, res) => {
      try {
        // validator body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        pool.query(
          `UPDATE product SET name=? WHERE id_product=?`,
          [req.body.name, req.params.id_product],
          (err, result, fields) => {
            if (err) {
              return console.log(err);
            }
            return res.status(200).json({
              metadata: {
                success: true,
                message: "Prodotto modificato correttamente",
              },
              data: req.body,
              status: result,
            });
          }
        );
      } catch (error) {
        res.status(500).json({
          metadata: {
            success: false,
            message: "Prodotto non modificato",
          },
          data: error,
        });
      }
    },
  ],
  //   delete
  delete: (req, res) => {
    try {
      pool.query(
        `DELETE FROM product WHERE id_product=?`,
        [req.params.id_product],
        (err, result, fields) => {
          if (err) {
            return console.log(err);
          }
          return res.status(200).json({
            metadata: {
              success: true,
              message: "Prodotto cancellato correttamente",
            },
            data: req.body,
            status: result,
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        metadata: {
          success: false,
          message: "Prodotto non cancellato",
        },
        data: error,
      });
    }
  },
};

module.exports = productController;
