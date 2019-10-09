const express = require('express');
const router = express.Router();

//Route - localhost:5000/match_data/opposition

router.get('/:id', (req, res) => {
  let df = req.app.locals.data;
  let query_param = req.params.id;
  let series = df.getSeries(query_param);
  let data = {};
  let match_count = {};
  for (const i of series) {
    if (match_count.hasOwnProperty(i)) {
      match_count[i]++;
    } else match_count[i] = 1;
  }
  res.json({
    match_count
  });
});

module.exports = router;
