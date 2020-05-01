"use strict";

class StringBuilder {
  constructor(baseString = "") {
    this.value = baseString;
  }
  append = str => `${this.value}${str}`;
  prepend = str => `${str}${this.value}`;
  pad = str => `${str}${this.value}${str}`;
}

const builder = new StringBuilder(".");

console.log(builder.pad("="));
