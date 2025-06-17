/**
 * Challenge: Build the Header component in a separate file
 * and render it here in the App component
 */

import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";


export default function App() {
	return (
		<>
			<Header />
			<Main />
		</>
	);
}
