const router = require("express").Router();
/* 
// sending html content
const fs=require("fs")
router.get("/", (req, res) => {
  let homePage = fs.readFileSync("./src/templets/index.html");
  res.statusCode = 200;
  res.setHeader("Content-type", "text/html");
  res.write(homePage);
  res.end();
}); 
*/


router.use(["/users","/user"], require("./model_routes/user"));
router.use(["/attachment"], require("./model_routes/attachment"))

router.use("/",require("./model_routes/global"))// this should be the last one


router.get("/",(req,res)=>res.status(200).send({success:true, message:"api is working"}))
router.all("*", (req, res) => res.send("page not found"));


module.exports =router;
