export function header() {
  let myElement = `
    <header class="header">
<div class="container">
  <div class="header-left">
    <a href="#"><img src="images/logo.png" /></a>

    <a class="learn" href="#">
      <i class="fa-solid fa-gun"></i>
      Learn to Use Shutguns
    </a>
  </div>
  <div class="header-right">
    <input class="test123" type="text" placeholder="  Search" />
    <a class="search" href="#">
      <i class="fa-solid fa-magnifying-glass"></i>
    </a>
    <ul>
      <li>
        <a class="join" href="/login.html"> Buy Now </a>
      </li>
      <li>
        <a href="/login.html">Cart</a>
      </li>
    </ul>

    <a
      onclick="myFunction()"
      class="hamburger"
      href="javascript:void(0);"
    >
      <i class="fa-sharp fa-solid fa-bars"></i
    ></a>
  </div>
</div>
</header>
    `;
  return myElement;
}
