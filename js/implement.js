
var bookList = []
var currentIndex = -1

var json = localStorage.getItem('bList')
if (json != null && json != '') {
    bookList = JSON.parse(json)
    showData()
}

$('#addBookForm').submit(function () {
    console.log('okok')
    //Save thong tin sinh vien
    var bTitle = $('#bookTitle').val()
    var bAuthor = $('#bookAuthor').val()
    var company = $('#company').val()
    var year = $('#year').val()

    //Tao 1 object tu du lieu tren
    var b = {
        'bookTitle': bTitle,
        'bookAuthor': bAuthor,
        'company': company,
        'year': year
    }

    //Them doi tuong sinh vien std vao mang studentList
    if (currentIndex >= 0) {
        //Sua du lieu
        bookList[currentIndex] = b;
        currentIndex = -1
    } else {
        bookList.push(b)
    }

    //  Hien thi du lieu len table
    // $('#book_list_id').append(`<tr>
    // 		<td>${bookList.length}</td>
    // 		<td>${b.bookTitle}</td>
    // 		<td>${b.bookAuthor}</td>
    // 		<td>${b.company}</td>
    // 		<td>${b.year}</td>
    // 		<td><button class="btn btn-warning" onclick="editBook(${bookList.length - 1})">Sửa</button></td>
    // 		<td><button class="btn btn-danger" onclick="deleteBook(${bookList.length - 1})">Xóa</button></td>
    // 	</tr>`)
    showData()

    $('#btn_reset').click() //Click tu dong vao button reset -> xoa du lieu trong form di.
    return false;
})

function editBook(index) {
    currentIndex = index
    var b = bookList[index]

    $('#bookTitle').val(b.bookTitle)
    $('#bookAuthor').val(b.bookAuthor)
    $('#company').val(b.company)
    $('#year').val(b.year)
}
// function searchBook() {
//     var keyword = document.getElementById('searchBook').value.toLowerCase();
//     var searchResults = [];


//     for (var i = 0; i < bookList.length; i++) {
//       var bookTitle = bookList[i].name.toLowerCase();
//       var bAuthor = bookList[i].id.toLowerCase();

//       if (bookTitle.includes(keyword) || bAuthor.includes(keyword)) {
//         searchResults.push(bookList[i]);
//       }
//     }


//     showData()
//   }
function deleteBook(index) {
    var option = confirm('Ban co chac chan muon xoa sach nay khong?')
    if (!option) return
    bookList.splice(index, 1)
    showData()
}

function showData() {
    //Hien thi lai danh sach sinh vien trong mang studentList
    $('#book_list_id').empty()
    //Hien thi lai danh sach sinh vien
    for (var i = 0; i < bookList.length; i++) {
        $('#book_list_id').append(`<tr>
					<td>${i + 1}</td>
					<td>${bookList[i].bookTitle}</td>
					<td>${bookList[i].bookAuthor}</td>
					<td>${bookList[i].company}</td>
					<td>${bookList[i].year}</td>
					<td><button class="btn btn-warning" onclick="editBook(${i})">Sửa</button></td>
					<td><button class="btn btn-danger" onclick="deleteBook(${i})">Xóa</button></td>
				</tr>`)
    }

    //Luu tru du lieu lai
    //convert stdList array -> json string
    var json = JSON.stringify(bookList)
    //Save
    localStorage.setItem('bList', json)
}
