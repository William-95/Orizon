const pool = require("../config/database");
const { body, validationResult } = require("express-validator");

const userController = {
  // read
  read: (req, res) => {
    try {
      pool.query("select*from user", (err, result, fields) => {
        if (err) {
          return console.log(err);
        }
        return res.status(200).json({
          metadata: {
            success: true,
            message: "Lista utenti pronta alla lettura",
          },
          data: result,
        });
      });
    } catch (error) {
      res.status(500).json({
        metadata: {
          success: false,
          message: "Lista utenti non disponibile",
        },
        data: error,
      });
    }
  },
  //   create
  create: [
    body("name").escape(),
    body("surname").escape(),
    body("email").escape(),
    (req, res) => {
      try {
        // validator body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        pool.query(
          `insert into user(name,surname,email) values(?,?,?)`,
          [req.body.name, req.body.surname, req.body.email],
          (err, result, fields) => {
            if (err) {
              return console.log(err);
            }
            return res.status(200).json({
              metadata: {
                success: true,
                message: "Utente inserito correttamente",
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
            message: "Utente non inserito",
          },
          data: error,
        });
      }
    },
  ],
  //   update
  update: [
    body("name").escape(),
    body("surname").escape(),
    body("email").escape(),
    (req, res) => {
      try {
        // validator body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        pool.query(
          `UPDATE user SET name=?,surname=?,email=? WHERE id=?`,
          [req.body.name, req.body.surname, req.body.email, req.params.id],
          (err, result, fields) => {
            if (err) {
              return console.log(err);
            }
            return res.status(200).json({
              metadata: {
                success: true,
                message: "Utente modificato correttamente",
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
            message: "Utente non modificato",
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
        `DELETE FROM user WHERE id=?`,
        [req.params.id],
        (err, result, fields) => {
          if (err) {
            return console.log(err);
          }
          return res.status(200).json({
            metadata: {
              success: true,
              message: "Utente cancellato correttamente",
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
          message: "Utente non cancellato",
        },
        data: error,
      });
    }
  },
};

module.exports = userController;
