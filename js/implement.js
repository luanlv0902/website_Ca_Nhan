window.onload = function () {
    document.getElementById('bookTitle').focus();
};
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

    showData()
    $('#btn_reset').click() //Click tu dong vao button reset -> xoa du lieu trong form di.
    return false;
})

function searchBooks() {
    // Lấy giá trị nhập từ ô tìm kiếm
    var searchValue = document.getElementById('searchBook').value.toUpperCase();

    // Lấy danh sách các hàng trong bảng
    var rows = document.getElementById('book_list_id').getElementsByTagName('tr');

    // Duyệt qua từng hàng để ẩn/hiện dữ liệu tương ứng
    for (var i = 0; i < rows.length; i++) {
        var bookName = rows[i].getElementsByTagName('td')[1]; // Cột Tên Sách
        var author = rows[i].getElementsByTagName('td')[2]; // Cột Tác Giả

        // Nếu tên sách hoặc tác giả chứa giá trị tìm kiếm, hiển thị hàng đó, ngược lại ẩn đi
        if (bookName || author) {
            if (bookName.innerHTML.toUpperCase().indexOf(searchValue) > -1 ||
                author.innerHTML.toUpperCase().indexOf(searchValue) > -1) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

function editBook(index) {
    currentIndex = index
    var b = bookList[index]

    $('#bookTitle').val(b.bookTitle)
    $('#bookAuthor').val(b.bookAuthor)
    $('#company').val(b.company)
    $('#year').val(b.year)
}

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