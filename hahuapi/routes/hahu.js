const { response } = require('express');
var express = require('express');
const hirdetes = require('../models/hirdetes');
var router = express.Router();

var Hirdetes = require('../models/hirdetes');
const Kategoria = require('../models/kategoria');


router.post('/', function (req, res, next) {

  const _id = req.body._id;
  const kategoria = req.body.kategoria;
  const cim = req.body.cim;
  const leiras = req.body.leiras;
  const hirdetesDatuma = req.body.hirdetesDatuma;
  const serulesmentes = req.body.serulesmentes;
  const arFt = req.body.arFt;
  const kepUrl = req.body.kepUrl;

  try {
    if (arFt % 1000 != 0) {
      throw Error("Az ár nem osztható 1000-el!")
    }
    const hirdetes = new Hirdetes({ _id, kategoria, cim, leiras, hirdetesDatuma, serulesmentes, arFt, kepUrl });
    hirdetes
      .save()
      .then(res.status(200).json({
        "message": "A rekord rögzítése sikeres!"
      }))
      .catch(err => console.log(err))
  } catch (error) {
    res.status(400).json({
      'error': error.message,
    })
  }

});

router.get("/", function (req, res, next) {
  Hirdetes
    .find()
    .then(hirdetesek => {
      res.json(hirdetesek);
    })
})
router.get("/:mezo", function (req, res, next) {
  const mezo = req.params.mezo;
  Hirdetes.find()
    .populate('kategoria', 'nev - id')
    .sort({ [mezo]: 1 })
    .then(response => {
      res.json(response);
    })
    .catch(err => console.log(err));
})

router.delete("/:id", function (req, res, next) {
  const id = req.params.id;
  Hirdetes
    .findById(id)
    .then(response => {
      if (response === null) {
        return res.json({ 'error': `A hirdetés ${id} azonosítóval nem létezik` })
      }
      Hirdetes.findByIdAndDelete(id)
        .then(
          res
            .status(200)
            .json({ status: `A hirdetés ${id} azonosítóval törlésre került!` })
        )
    })
  Hirdetes
    .findByIdAndDelete(id)
    .then(res.status(200).json({
      'status': 'Sikeres a törlés'
    }))
    .catch(err => console.log(err));
})
router.put('/', function (req, res, next) {
  const _id = req.body._id;
  const updatedArFt = req.body.arFt;
  Hirdetes.findOneAndUpdate(
      {cim: "Traktor"},
      { arFt: updatedArFt },
      { runValidators: true },
      function (err, docs) {
      try {
        if (docs === null) {
          throw new Error("A megadott azonosító nem létezik!");
        }
        res.json(docs);
      } catch (error) {
        res.json(error.message)
      }
    })
  });
  router.get('/adat/:id', function (req, res,next){
    const id = req.params.id;
    Hirdetes
    .findById(id)
    .then(result => {
      if (!result) {
        res.json({'error': 'Nincs ilyen id!'});
      }
        res.json(result)
      })
      .catch(err => console.log(err))
  })
module.exports = router;
