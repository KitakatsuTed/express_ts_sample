import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return `<div>Hello React!</div>`;
};

// フロントサイドはここから展開する
ReactDOM.render('hello world', document.getElementById("index"))