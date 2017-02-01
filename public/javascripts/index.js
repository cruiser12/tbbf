$(function()
{
    var buildMatrix = function(x,y)
    {

        var buildRow = function(table)
        {
            console.log(table);
            var row = $("<tr></tr>");
            row.appendTo(table);

            return row;
        }

        var buildColumn = function(row)
        {
            var column = $("<td></td>");
            column.appendTo(row);

            return column;
        }

        var buildInputField = function(column)
        {
            var input = $("<input id='"+i+"x"+j+"' type='txt' maxlength='1' data-x='"+j+"' data-y='"+i+"'/>");
            input.appendTo(column);

            return input;
        }
        var buildTable = function()
        {
            var table = $("<table class='matrix'></table>");
            table.appendTo("div.matrix");

            return table;
        }

        var i=0;
        var j=0;
        var table,row, column;

        table = buildTable();

        while (i < y )
        {
            j=0;
            row = buildRow(table);
            while (j < x)
            {
                column = buildColumn(row);
                input = buildInputField(column);
                j++;
            }
            i++;
        }

    }
    var fillMatrix = function(matrix)
    {
        console.log(matrix);
        var i=0;
        var j=0;
        y = matrix.length;
        x = matrix[0].length;
        while (i < y )
        {
            j=0;
            while (j < x)
            {
                console.log()
                $('#'+i+'x'+j).val(matrix[i][j]);
                j++;
            }
            i++;
        }
    }
    var setEventsForMatrix = function()
    {
        $("table.matrix input").keydown(
            function(e)
            {
                event.preventDefault();
                var key = e.which;
                if (key == 8)
                {
                    var prev = $(this).parent().prev().find('input').first();
                    if (prev.length == 0) prev = $(this).parent().parent().prev().find('input').last();
                    prev.focus();
                    $(this).val("");
                }
                else if (key != 9)
                {
                    var next = $(this).parent().next().find('input').first();
                    console.log(next);
                    if (next.length==0) next = $(this).parent().parent().next().find('input').first();
                    next.focus();
                    $(this).val(String.fromCharCode(key));
                }
            }
        );
        $("button.matrix").click(
            function()
            {
                var matrix = getMatrixFromInputs();

                sendMatrixForExamination(matrix);
            }
        );

    };
    var getMatrixFromInputs = function()
    {
        var matrix = [];
        $("table.matrix input").each(
            function()
            {
                var y = $(this).data("y");
                var x = $(this).data("x");
                if (!matrix[y]) matrix[y]=[];
                matrix[y][x] = $(this).val().toUpperCase();
            }
        );
        return matrix;
    }
    var sendMatrixForExamination = function(matrix)
    {
        var onSuccess = function(response)
        {
            response.words.forEach(
                function(word)
                {
                    var word = $("<li>" + word.word + "<span>" + word.path + "</span></li>");
                    word.appendTo($("div.words ul"))
                }
            );
            $(".words li").click(
                function()
                {
                    $(".words li").css("background-color","white");
                    $("table.matrix input").css("background-color","white");
                    $(this).css("background-color","yellow");
                    var path = JSON.parse($(this).find('span').text());
                    path.forEach(
                        function(step)
                        {
                            $('#'+step[0]+'x'+step[1]).css("background-color","yellow");
                        }
                    )
                }
            );
        };

        $.ajax(
            {
                type        : "POST",
                url         : "/examine",
                data        : { "matrix" : JSON.stringify(matrix) },
                success     : onSuccess,
                dataType    : 'json'
            }
        );
    }

    var test =
        [
            ['T','Z','O','S','S','E'],
            ['E','L','A','T','A','C'],
            ['R','E','W','U','H','H'],
            ['K','L','S','F','N','L'],
            ['E','E','T','T','E','G'],
            ['S','D','E','E','L','N'],
            ['T','E','A','N','E','E']
        ];

    buildMatrix(6,7);
    //fillMatrix(test);
    setEventsForMatrix();
});
