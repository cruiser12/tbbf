var _ = require('lodash');

var getSurrounds = function(matrix,location,path)
{
    var surrounds = [];

    var locationNotInPath = function(_location)
    {
        for(var i = 0; i < path.length; i++)
        {
            if (_.isEqual(path[i],_location))
            {
                return false;
            }
        }
        return true;
    };

    var directions =
        {
            // [y,x]
            n   : [location[0]-1,  location[1]  ],
            ne  : [location[0]-1,  location[1]+1],
            e   : [location[0],    location[1]+1],
            se  : [location[0]+1,  location[1]+1],
            s   : [location[0]+1,  location[1]  ],
            sw  : [location[0]+1,  location[1]-1],
            w   : [location[0],    location[1]-1],
            nw  : [location[0]-1,  location[1]-1]
        };

    for (var i in directions)
    {
        var l = directions[i];

        if (
            matrix[l[0]] &&
            matrix[l[0]][l[1]] &&
            //matrix[l[0]][l[1]] != '-' &&
            locationNotInPath(l)
        )
        {
            surrounds.push(l);
        }

    }

    return surrounds;
}

module.exports = getSurrounds;