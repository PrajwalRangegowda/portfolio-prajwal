export default function SideMenu(props) {
  
  return (
    <nav className={props.Class}>
      <ul>
        <li>
          <a href="/design">Design</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="https://blog.prajwalrangegowda.com">Blog</a>
        </li>
        
        
      </ul>
    </nav>
  );
}
