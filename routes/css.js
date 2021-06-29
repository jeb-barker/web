module.exports.run_setup = function(app){
    app.get('/styles/css', function (req, res) {
        if (req.query.name == "styles") {
            res.sendFile(__dirname + "/css/styles.css");
        }
        else if (req.query.name == "dcf") {
            res.sendFile(__dirname + "/css/dog-cat-fish.css");
        }
        else if (req.query.name == "facts") {
            res.sendFile(__dirname + "/css/facts.css");
        }
        else if (req.query.name == "cm"){
            res.sendFile(__dirname + "/css/styles/cm-chessboard.css");
        }
        else if (req.query.name == "chb"){
            res.sendFile("/site/node_modules/cm-chessboard/src/cm-chessboard/Chessboard.js");
        }
        else if (req.query.name == "cmi"){
            res.sendFile("/site/node_modules/cm-chessboard/src/cm-chessboard/ChessboardMoveInput.js");
        }
        else if (req.query.name == "cpa"){
            res.sendFile("/site/node_modules/cm-chessboard/src/cm-chessboard/ChessboardPiecesAnimation.js");
        }
        else if (req.query.name == "cs"){
            res.sendFile("/site/node_modules/cm-chessboard/src/cm-chessboard/ChessboardState.js");
        }
        else if (req.query.name == "cv"){
            res.sendFile("/site/node_modules/cm-chessboard/src/cm-chessboard/ChessboardView.js");
        }
        else if (req.query.name == "staunty"){
            res.sendFile("/site/node_modules/cm-chessboard/assets/images/chessboard-sprite-staunty.svg");
        }
        else if (req.query.name == "cssm"){
            res.sendFile("/site/node_modules/cm-chessboard/styles/cm-chessboard.css.map");
        }
        else if (req.query.name == "scss"){
            res.sendFile("/site/node_modules/cm-chessboard/styles/cm-chessboard.scss");
        }
        else if (req.query.name == "chesscss") {
            res.sendFile(__dirname + "/css/chesscss.css");
        }
    });
}