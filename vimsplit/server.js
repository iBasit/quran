var test = function(n_rows,n_cols) {
    var table = 
        <table id="panels" cellspacing="0" cellpadding="0">
        </table>
    ;
    var row = 
        <tr class="row">
        </tr>
    ;
    var col =
        <td class="col">
            <div class="panel">
                <div class="header">
                    <h2 class="title">Header Title</h2>
                    <div class="triggers">
                        <a class="trigger foo" onclick="return false;" title="Foo"><span class="hidden">Foo</span></a>
                        <a class="trigger bar" onclick="return false;" title="Bar"><span class="hidden">Bar</span></a>
                    </div>
                </div>
                <div class="body">
                    <div class="content">
                        <p>the quick brown fox jumped over the lazy dog</p>
                        <img src="/shared/img/space.gif" width="100" height="200" style="float: left;"/>
                        <p style="float: none;">the quick brown fox jumped over the lazy dog</p>
                        <p style="float: right;">the quick brown fox jumped over the lazy dog</p>
                    </div>
                </div>
            </div>
        </td>
    ;
    /*
    for (var i=0; i<n_rows; i++) {
        table.appendChild(row);
    }
    for (var i=0; i<n_cols; i++) {
        row.appendChild(col);
    }
    $('#wrap').append(
        table.toString()
    );
    */
};
window.onserverload = function() {
    //test(2,3);
};
