let clicktoShow = document.querySelector("#showsidebar");
let sidebar = document.querySelector("#sidebar");
let hidesidebar = document.querySelector(".closeme");

clicktoShow.addEventListener("click", function () {
  sidebar.classList.toggle("user-sidebar-show");
  sidebar.classList.remove("closethebar");
});
clicktoShow.addEventListener("click", function () {
  sidebar.classList.remove("closethebar");
});
hidesidebar.addEventListener("click", function () {
  sidebar.classList.toggle("closethebar");
});
