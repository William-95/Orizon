const pool = require("../config/database");
const { body, validationResult } = require("express-validator");
const moment = require("moment-timezone");

const orderController = {
  // read
  read: (req, res) => {
    try {
      pool.query(
        `SELECT 
            orizon_db.orders.id_order,
            GROUP_CONCAT(DISTINCT orizon_db.product.name) as products,
            GROUP_CONCAT(DISTINCT orizon_db.user.name,', ',orizon_db.user.surname, ', ',orizon_db.user.email) as users,
            orizon_db.orders.date 
              FROM orizon_db.orders 
          LEFT JOIN orizon_db.product ON 
            FIND_IN_SET(orizon_db.product.id_product,REPLACE(orizon_db.orders.products, ', ', ',')) 
          LEFT JOIN orizon_db.user ON 
          FIND_IN_SET(orizon_db.user.id,REPLACE(orizon_db.orders.users, ', ', ',')) 
          GROUP BY orizon_db.orders.id_order,orizon_db.orders.date;`,
        (err, result, fields) => {
          if (err) {
            return console.log(err);
          }

          return res.status(200).json({
            metadata: {
              success: true,
              message: "Lista ordini pronta alla lettura",
            },
            data: result,
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        metadata: {
          success: false,
          message: "Lista ordini non disponibile",
        },
        data: error,
      });
    }
  },
  //   create
  create: [
    body("products").escape(),
    body("users").escape(),
    (req, res) => {
      try {
        // validator body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const userExists = pool.query("SELECT * FROM user WHERE id = ?", [
          req.body.users,
        ]);
        const productExists = pool.query(
          "SELECT * FROM product WHERE id_product = ?",
          [req.body.products]
        );

        if (userExists.length === 0 || productExists.length === 0) {
          return res
            .status(404)
            .json({ error: "Utente o prodotto non trovato" });
        }

        let currentDate = moment().tz("Europe/Rome").format("YYYY-MM-DD");

        pool.query(
          "INSERT INTO orders(products,users,date) VALUES(?, ?,?)",
          [req.body.products, req.body.users, currentDate],
          (err, result, fields) => {
            if (err) {
              return console.log(err);
            }
            return res.status(200).json({
              metadata: {
                success: true,
                message: "Ordine inserito correttamente",
              },
              data: req.body,
              status: result,
            });
          }
        );
      } catch (error) {
        return res.status(500).json({
          metadata: {
            success: false,
            message: "Ordine non inserito",
          },
          data: error,
        });
      }
    },
  ],
  //   update
  update: [
    body("products").escape(),
    body("users").escape(),
    (req, res) => {
      try {
        // validator body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        let currentDate = moment().tz("Europe/Rome").format("YYYY-MM-DD");

        pool.query(
          `UPDATE orders SET products=?,users=?,date=? WHERE id_order=?`,
          [req.body.products, req.body.users, currentDate, req.params.id_order],
          (err, result, fields) => {
            if (err) {
              return console.log(err);
            }
            return res.status(200).json({
              metadata: {
                success: true,
                message: "Ordine modificato correttamente",
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
            message: "Ordine non modificato",
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
        `DELETE FROM orders WHERE id_order=?`,
        [req.params.id_order],
        (err, result, fields) => {
          if (err) {
            return console.log(err);
          }
          return res.status(200).json({
            metadata: {
              success: true,
              message: "Ordine cancellato correttamente",
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
          message: "Ordine non cancellato",
        },
        data: error,
      });
    }
  },

  // filter by date
  filterDate: (req, res) => {
    try {
      pool.query(
        `SELECT 
            orizon_db.orders.id_order,
            GROUP_CONCAT(DISTINCT orizon_db.product.name) as products,
            GROUP_CONCAT(DISTINCT orizon_db.user.name,', ',orizon_db.user.surname, ', ',orizon_db.user.email) as users,
            orizon_db.orders.date 
              FROM orizon_db.orders 
          LEFT JOIN orizon_db.product ON 
            FIND_IN_SET(orizon_db.product.id_product,REPLACE(orizon_db.orders.products, ', ', ',')) 
          LEFT JOIN orizon_db.user ON 
          FIND_IN_SET(orizon_db.user.id,REPLACE(orizon_db.orders.users, ', ', ','))
           WHERE orizon_db.orders.date=?
            GROUP BY orizon_db.orders.id_order,orizon_db.orders.date;`,
        [req.query.date],
        (err, result, fields) => {
          if (err) {
            return console.log(err);
          }
          return res.status(200).json({
            metadata: {
              success: true,
              message: "Ordine filtrato per data",
            },
            data: result,
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        metadata: {
          success: false,
          message: "Filtraggio ordine per data fallito",
        },
        data: error,
      });
    }
  },
  // filter by products
  filterProducts: (req, res) => {
    try {
      pool.query(
        `SELECT 
            orizon_db.orders.id_order,
            GROUP_CONCAT(DISTINCT orizon_db.product.name) as products,
            GROUP_CONCAT(DISTINCT orizon_db.user.name,', ',orizon_db.user.surname, ', ',orizon_db.user.email) as users,
            orizon_db.orders.date 
              FROM orizon_db.orders 
          LEFT JOIN orizon_db.product ON 
            FIND_IN_SET(orizon_db.product.id_product,REPLACE(orizon_db.orders.products, ', ', ',')) 
          LEFT JOIN orizon_db.user ON 
          FIND_IN_SET(orizon_db.user.id,REPLACE(orizon_db.orders.users, ', ', ',')) 
          WHERE product.name LIKE ?
           GROUP BY orizon_db.orders.id_order,orizon_db.orders.date;`,
        [`%${req.query.products}%`],
        (err, result, fields) => {
          if (err) {
            return console.log(err);
          }
          return res.status(200).json({
            metadata: {
              success: true,
              message: "Ordine filtrato per prodotto",
            },
            data: result,
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        metadata: {
          success: false,
          message: "Filtraggio ordine per prodotto fallito",
        },
        data: error,
      });
    }
  },
};

module.exports = orderController;
