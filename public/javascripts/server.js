var examiner = (function()
{
    var matrix = [];
    var words = [];
    var location = [0, 0];
    var maximumWordLength = 12;

    var getStartingPoints = function (matrix)
    {
        var startingPoints = [];
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] != '-') startingPoints.push([i, j]);
            }
        }
        return startingPoints;
    };

    var getSurrounds = function (matrix, location, path)
    {
        var surrounds = [];

        var locationNotInPath = function (_location)
        {
            for (var i = 0; i < path.length; i++) {

                if ( path[i].join(',') == _location.join(',') ) {
                    return false;
                }
            }
            return true;
        };

        var directions =
            {
                // [y,x]
                n: [location[0] - 1, location[1]],
                ne: [location[0] - 1, location[1] + 1],
                e: [location[0], location[1] + 1],
                se: [location[0] + 1, location[1] + 1],
                s: [location[0] + 1, location[1]],
                sw: [location[0] + 1, location[1] - 1],
                w: [location[0], location[1] - 1],
                nw: [location[0] - 1, location[1] - 1]
            };

        for (var i in directions)
        {
            var l = directions[i];

            if (
                matrix[l[0]] &&
                matrix[l[0]][l[1]] &&
                matrix[l[0]][l[1]] != '-' &&
                locationNotInPath(l)
            ) {
                surrounds.push(l);
            }
        }

        return surrounds;
    }

    var getWordFromPath = function (matrix, path)
    {
        var word = '';
        for (var i = 0; i < path.length; i++) {
            if (path[i]) word += matrix[path[i][0]][path[i][1]];
        }
        return word;
    };

    var searchForWord = function (db, word)
    {
        string = "db";
        for (j = 0; j < word.length; j++) {
            string += "['" + word[j] + "']";
        }

        found = eval(string);

        if (typeof found === 'object') {
            if (found[1] !== undefined)
                return "HIT";
            else
                return "LIKE"
        }
        else return false;
    };

    var iterateSurrounds = function (surrounds, pathSoFar)
    {

        for (i = 0; i <= surrounds.length; i++) {
            pathSoFar.push(surrounds[i]);

            var word = getWordFromPath(matrix, pathSoFar);
            var result = searchForWord(db, word);

            if (result == false) {
                delete surrounds[i];
            }
            else if (result == "HIT") {
                words.push({
                    word: word,
                    path: JSON.stringify(pathSoFar)
                });
            }
            pathSoFar.pop();
        }
        ;

        surrounds.forEach(
            function (s) {
                if (s !== undefined) {
                    pathSoFar.push(s);

                    if (pathSoFar.length <= maximumWordLength) {
                        iterateSurrounds(
                            getSurrounds(matrix, s, pathSoFar),
                            pathSoFar
                        );
                    }

                    pathSoFar.pop();
                }
            }
        );
    };

    var run = function (m)
    {
        matrix = m;

        getStartingPoints(matrix)
            .forEach(
                function (location) {
                    iterateSurrounds(
                        getSurrounds(
                            matrix,
                            location,
                            []
                        ),
                        [location]
                    );
                }
            );

        words.sort(
            function (a, b) {
                return b.word.length - a.word.length
            }
        );

        return words;
    };

    return {run: run};

}());