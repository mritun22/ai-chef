import chefIcon from "../images/chef-icon.png";

function Header() {
	return (
		<header>
			<img src={ chefIcon } alt="Chef icon" className="icon" />
			<span className="title">AI Chef</span>
		</header>
	);
}

export default Header;