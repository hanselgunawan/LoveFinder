/**
 * Created by hansel.tritama on 11/13/17.
 */
let loverArr = [];
module.exports = function (app) {
    app.get("/api/friends", (req, res) => {
        return res.json(loverArr);
    });

    app.post("/api/friends", (req, res) => {
        let userData = req.body;//body-parser works here!
        loverArr.push(userData);
        res.json(loverArr);
    });
};