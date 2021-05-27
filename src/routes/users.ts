import { Request, Response } from "express";

/* GET users listing. */
export const index = (req: Request, res: Response) => {
  res.send('respond with a resource');
};



// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;
