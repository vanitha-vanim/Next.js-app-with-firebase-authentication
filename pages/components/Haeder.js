import { useEffect, useState } from "react";
// import '../styles/style.css';
// import HeroImage from '../../public/images/website/hero.png'
import Link from 'next/link';

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [clientWindowHeight, setClientWindowHeight] = useState("");
  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const [padding, setPadding] = useState(30);
  const [boxShadow, setBoxShadow] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;

    if (backgroundTransparacyVar < 1) {
      let paddingVar = 30 - backgroundTransparacyVar * 20;
      let boxShadowVar = backgroundTransparacyVar * 0.1;
      setBackgroundTransparacy(backgroundTransparacyVar);
      setPadding(paddingVar);
      setBoxShadow(boxShadowVar);
    }
  }, [clientWindowHeight]);

  return (
    <header>
      {/* <nav>
        <ul>
          <li><a href="/">Home...</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/dash/monash/admin">Admin</a></li>
        </ul>
      </nav> */}

      <>
      <div className={`container-xxl position-relative p-0 ${
        scrolling ? "sticky-top shadow-sm" : ""
      }`}>
    

            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0 px-lg-5 py-3 py-lg-0"> */}
            <nav
              class="navbar navbar-expand-lg navbar-dark fixed-top px-4 px-lg-5-nav py-3 py-lg-0"
              style={{
                background: `rgba(255, 255, 255, ${backgroundTransparacy})`,
                padding: `${padding}px 0px`,
                boxShadow: `rgb(0 0 0 / ${boxShadow}) 0px 0px 20px 6px`,
              }}
            >
                <a href="" className="navbar-brand p-0">
                    {/* <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>Restoran</h1> */}
                    <img src="/images/website/logo.png" alt="Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0 pe-4">
                        <a href="/" className="nav-item nav-link active">Home</a>
                        <a href="/about" className="nav-item nav-link">About</a>
                        <a href="dash/admin/dashboard" className="nav-item nav-link">Admin</a>
                        <a href="service.html" className="nav-item nav-link">Service</a>
                        <a href="menu.html" className="nav-item nav-link">Menu</a>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu m-0">
                                <a href="booking.html" className="dropdown-item">Booking</a>
                                <a href="team.html" className="dropdown-item">Our Team</a>
                                <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                            </div>
                        </div>
                        <a href="contact.html" className="nav-item nav-link">Contact</a>
                    </div>
                    <a href="" className="btn btn-primary py-2 px-4">Order now</a>
                </div>
            </nav>

            <div className="container-xxl py-5 bg-dark hero-header mb-5">
                <div className="container my-5 py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 text-center text-lg-start">
                            <h1 className="display-3 text-white animated slideInLeft">Enjoy Our<br />Delicious Meal</h1>
                            <p className="text-white animated slideInLeft mb-4 pb-2">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <a href="" className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft">Book A Table</a>
                        </div>
                        <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                            {/* <img className="img-fluid" src={HeroImage} alt="" /> */}
                            <img className="img-fluid" src="/images/website/hero.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    </header>
  );
};

export default Header;
