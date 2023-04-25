const router = require("express").Router();
const accountsModel = require("./accounts-model");
const mw = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allAccounts = await accountsModel.getAll();
    res.json(allAccounts);
  } catch (error) {}
});

router.get("/:id", mw.checkAccountId, (req, res, next) => {
  try {
    res.json(req.Account);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      let model = { name: req.body.name, budget: req.body.budget };
      const insertedAccount = await accountsModel.create(model);
      res.status(201).json(insertedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountId,
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      let model = { name: req.body.name, budget: req.body.budget };
      const updatedAccount = await accountsModel.updateById(
        req.params.id,
        model
      );
      res.json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    await accountsModel.deleteById(req.params.id);
    res.json(`${req.Account.name} isimli kayıt silindi`);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line

  res.status(err.status || 400).json({
    customMessage:
      "Bir hata oluştu, custom error handle üzerinden geldi bu hata",
    message: err.message,
  });
});

module.exports = router;
