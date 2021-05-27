module.exports.run_setup = function(app){
    app.get('/facts', function (req, res) {
        console.log('user landed at facts');

        let obj = {}
        let topics = {
            "chess":
            {
                name: "Chess",
                value: "chess",
                facts: ['The number of possible unique chess games is much greater than the number of electrons in the universe. The number of electrons is estimated to be about 10^79, while the number of unique chess games is 10^120.', 'The longest chess game theoretically possible is 5,949 moves.', 'The longest time for a Castling move to take place was the match game between Bobotsor vs. Irkov in 1966: 46. 0-0.', 'As late as 1561, Castling was two moves. You had to play R-KB1 on one move and K-KN1 on the next move.', 'The word “Checkmate” in Chess comes from the Persian phrase “Shah Mat,” which means “the King is dead.”', 'Blathy, Otto (1860-1939), credited for creating the longest Chess Problem, mate in 290 moves.', 'The Police raided a Chess Tournament in Cleveland in 1973, arrested the Tournament director and confiscated the Chess sets on charges of allowing gambling (cash prizes to winners) and possession of gambling devices (the Chess sets).', 'The number of possibilities of a Knight’s tour is over 122 million.', 'The longest official chess game lasted 269 moves (I. Nikolic – Arsovic, Belgrade 1989) and ended in a draw.', ' From the starting position, there are eight different ways to Mate in two moves and 355 different ways to Mate in three moves.', ' The new Pawn move, advancing two squares on its first move instead of one, was first introduced in Spain in 1280.', ' Dr. Emanuel Lasker from Germany retained the World Chess Champion title for more time than any other player ever: 26 years and 337 days.', ' In 1985, the Soviet player Garry Kasparov became the youngest World Chess Champion ever at the age of 22 years and 210 days.', ' The first Chessboard with alternating light and dark squares appears in Europe in 1090.', ' During World War II, some of the top Chess players were also code breakers. British masters Harry Golombek, Stuart Milner-Barry and H. O’D. Alexander was on the team which broke the Nazi Enigma code.', ' During the 1972 Fischer-Spassky match in Rekjavik, the Russians linked Spassky’s erratic play with Fischer’s chair. The Icelandic organization put a 24-hour Police guard around the chair while chemical and x-ray tests were performed on the chair. Nothing unusual was found.', ' The first mechanical Chess Clock was invented by Thomas Wilson in 1883. Prior to that, Sandglasses were used. Sandglasses were first used in London in 1862. The present day push-button Clock was first perfected by Veenhoff in 1900.', ' The folding Chess board was originally invented in 1125 by a Chess-playing priest. Since the Church forbids priests to play Chess, he hid his Chess board by making one that looked simply like two books lying together.', ' The worst performance by a player was Macleod of Canada who lost 31 games in the New York double-round robin of 1889.', ' Frank Marshall (1877-1944) was the first American to defeat a Soviet player in an international tournament in New York, 1924. He reigned as U.S. Champion for 30 years, but only defended his title once when he defeated Ed Lasker (5-4) in 1923. He was the first master to play more than 100 games simultaneously.', ' In 1985, Eric Knoppert played 500 games of 10-minute Chess in 68 hours.', ' Albert Einstein was a good friend of World Chess Champion Emanuel Lasker. In an interview with the New York Times in 1936 Albert said, “I do not play any games. There is no time for it. When I get through work I don’t want anything which requires the working of the mind.” He did take up Chess in his later life.', ' There were 72 consecutive Queen moves in the Mason-Mackenzie game at London in 1882.', ' The record of moves without capture is of 100 moves during the Match between Thorton and M. Walker in 1992.', ' Rookies or, players in their first year, are named after the Rook in Chess. Rooks generally are the last pieces to be moved into action, and the same goes for Rookies.', ' A Computer Program named Deep Thoughtbeat an International Grand Master for the first time in November 1988 in Long Beach, California.', ' Blindfold chess is an impressive skill that many stronger chess players possess. It certainly requires a keen ability to see the board clearly, which can get difficult after many moves. The record was set in 1960 in Budapest by Hungarian Janos Flesch, who played 52 opponents simultaneously while blindfolded – he won 31 of those games.', ' There are well over 1,000 different openings, including variations within larger openings/defenses that one can learn.', ' Chess is often cited by psychologists as an effective way to improve memory function. Also allowing the mind to solve complex problems and work through ideas, it is no wonder that chess is recommended in the fight against Alzheimer’s. Some contend that it can increase one’s intelligence, though that is a more complex topic. The effects of chess on young individuals had led to chess being introduced in school districts and various countries. It has been shown to improve children’s grades and other positive effects as well.', ' FIDE stands for Fédération Internationale des Échecs, which literally translates into World Chess Federation.', ' The second book ever printed in the English language was about chess!', ' The first computer program for playing chess was developed in 1951, by Alan Turing. However, no computer was powerful enough to process it, so Turing tested it by doing the calculations himself and playing according to the results, taking several minutes per move.', ' The oldest recorded chess game in history is from the 900s, between a historian from Baghdad and his student.', ' The oldest surviving complete chess sets were found on the Isle of Lewis, in northern Scotland, and dates to the 12th century. They were probably made in Iceland or Norway, and their appearance was used in Harry Potter and the Sorcerer’s Stone for the wizard chess pieces.', ' About 600,000,000 (Six hundred million) people know how to play chess worldwide!', ' In many languages, the Pawn is a foot soldier, but in German and Spanish, it’s a peasant or farmer, instead!', ' The reason why traditional chess pieces don’t look like actual soldiers, bishops, and kings is because before the game reached Europe, it passed through the Islamic world. Islam forbids making statues of animals or people, so chess pieces became vague-looking. When the game spread to Christian Europe, the pieces didn’t change much.', ' Chess began in India during the Gupta Empire, spreading to the Persian Sassanid Empire, and then to the Middle East after Muslims conquered Persia. From there, it spread to Europe and Russia.', ' Initially, the Queen could only move one square at a time, diagonally. Later, she could move two squares at a time, diagonally. It wasn’t until Reconquista Spain, with its powerful queen Isabella, that the Queen became the strongest piece on the board.'],
            },
            "rhymes":
            {
                name: "Rhymes",
                value: "rhymes",
                facts: ['Cat – Sat – Bat', 'Ball – Fall – Tall', 'Right – Kite – Height', 'Owl – Towel – Growl', 'Bore – Four – Roar', 'Rock – Chalk – Hawk', 'One – Gun – Won', 'Face – Place – Race', 'Boat – Coat – Float', 'All – Ball – Call', 'Cave – Gave – Save', 'Jump – Bump – Lump', 'Day – Stay – Hay', 'Hole – Mole – Stole', 'Hot – Not – Cot', 'Cook – Look – Hook', 'Seed – Feed – Weed', 'Map – Sap – Lap', 'Skip – Drip – Lip', 'Wit – Hit – Sit', 'Love – Dove – Glove', 'Bird – Heard', 'Red – Bed – Said', 'Happy – Nappy – Sappy', 'Well – Sell – Tell', 'Hill – Will – Kill', 'Hide – Tide – Wide', 'Sing – Wing – King', 'Cow – How – Now', 'Kick – Pick – Lick', 'Ad – Add', 'Blew – Blue', 'Bear – Bare', 'Days – Daze', 'Flee – Flea', 'Read – Red', 'Write – Right', 'Made – Maid', 'Peace – Piece', 'Pail – Pale', 'Reign – Rain', 'Very – Vary', 'Wool – Fool', 'Rig – Dig', 'Pet – Met', 'Soon – Moon', 'Hop – Pop', 'Make – Cake', 'Hero – Zero', 'Change – Range', 'Caller – Taller', 'Bridge – Fridge', 'Sheet – Feet', 'Pen – Men', 'Win – Bin', 'Sand – Band', 'Bag – Rag', 'Moat – Goat', 'Dish – Wish', 'Main – Pain', 'Meet – Greet', 'Seven – Heaven', 'Nine – Wine', 'Ten – Hen', 'Four – Door', 'Three – Tree', 'Two – Shoe', 'Six – Sticks', 'Eight – Skate']
            }
        }

        topics.chess.len = topics.chess.facts.length
        topics.rhymes.len = topics.rhymes.facts.length





        obj.num = req.query.num
        obj.usrtopic = req.query.topic

        if (req.query.topic == "chess") {
            obj.topic = topics.chess
            obj.topics = topics
            
        }
        else if (req.query.topic == "rhymes") {
            obj.topic = topics.rhymes
            obj.topics = topics
        }
        else {
            obj.topics = topics
        }


        if (topics.hasOwnProperty(req.query.topic) && 0 < parseInt(req.query.num) < topics.chess.facts.length - 1) {
            obj.topic.facts = obj.topic.facts.slice(0, parseInt((parseInt(req.query.num)/100)*obj.topic.len))
        }
        else {
            obj.error = true
        }

        obj.CSSLink = "https://jbarkerwebdev.sites.tjhsst.edu/styles/css?name=facts";

        res.render("facts.hbs", obj);
    });
}