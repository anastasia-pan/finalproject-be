//==================================== function to populate list ===============================//

const makeObject = (name, location) => {
  return {
    name: name,
    location: location,
  };
};

let totemObjects = [
  makeObject("amulet", "Athens"),
  makeObject("car", "Usa"),
  makeObject("script", "Rome"),
];

let a = ["a", "b", "c"];
let b = ["1", "2", "3"];

let newList = [];
for (let i in a) {
  newList.push(makeObject(a[i], b[i]));
}

console.log(newList);

console.log(totemObjects);

// bulk create
router.post("/", async (req, res) => {
  res.status(201).json({ msg: "adminpostbulkcreatereached" });
});
