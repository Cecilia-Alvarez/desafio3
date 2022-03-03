const fs = require("fs");

class Container {
  constructor(name) {
    this.name = name;
  }

  save(obj) {
    try {
      const content = fs.readFileSync(this.name);
      const content_parsed = JSON.parse(content);

      obj["id"] = content_parsed[content_parsed.length - 1].id + 1;
      fs.writeFileSync(
        `${this.name}`,
        JSON.stringify([...content_parsed, obj])
      );
    } catch (err) {
      fs.writeFileSync("./products.txt", JSON.stringify([{ ...obj, id: 0 }]));
    }
  }

  getById(id) {
    try {
      const products = fs.readFileSync("./products.txt");
      return products.find((product) => id === product.id);
    } catch (error) {
      console.log(error);
    }
  }

  getAll() {
    try {
      const content = fs.readFileSync(this.name);
      return JSON.parse(content);
    } catch (error) {
      console.log("No se pudo leer el archivo.");
    }
  }

  deleteById(id) {
    try {
      const products = this.getAll();
      let index = products.find((product) => id === product.id);
      products.splice(index, 1);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  deleteAll() {
    fs.writeFileSync("./products.txt", "");
  }
}
module.exports = Container;
