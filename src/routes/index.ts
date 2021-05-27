import { Request, Response } from "express";

/* GET home page. */
export const index =  (req: Request, res: Response) => {
  res.send('hello world')
};

// const express = require('express');
// // const router = express.Router();
// import { Request, Response } from "express";
//
// /* GET home page. */
// router.get('/', function(req: Request, res: Response, next) {
//   // res.render('index', { title: 'Express' });
//   res.send('hello world')
// });
//
// module.exports = router;
