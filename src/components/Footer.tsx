import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs"


export default function Footer() {
	return (
		<footer >
			<div className="grid">
				<div>
					<h4>STUDENT HOSTEL</h4>
					<p>A place to live, learn, and grow</p>
					<ul>
						<li><a href="/">About us</a></li>
						<li><a href="/">Contact us</a></li>
						<li><a href="/">Privacy policy</a></li>
					</ul>
				</div>
				<div>
					<h4>FOLLOW US</h4>
					<p>Stay connected with us on social media</p>
					<ul className="social-icons">
						<li><BsFacebook /> <a href="https://www.facebook.com/diu.net.bd/">Facebook</a></li>
						<li><BsTwitter /> <a href="https://twitter.com/diubd">Twitter</a></li>
						<li><BsInstagram /> <a href="https://www.instagram.com/diu.net.bd/">Instagram</a></li>
					</ul>
				</div>
				<div>
					<h4>SUBSCRIBE</h4>
					<p>Get the latest news and updates from our hostel</p>
					<form action="#" method="post">
						<input type="email" name="email" placeholder="Enter your email" />
						<button type="submit">Subscribe</button>
					</form>
				</div>
			</div>
			<p className="copy">&copy; 2023 Dhaka International University. All rights reserved.</p>
		</footer>
	)
}
