import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import Link from 'next/link';
import styles from '../styles/SignIn.module.css'; 
import '../styles/global.css'; 
import { auth } from '../firebase';
import {
  getFirestore, collection, getDocs, addDoc
} from 'firebase/firestore';

import Header from './components/Haeder';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
import BackToTop from './components/BackToTop';


function Home() {
  const [posts, setPosts] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });


  useEffect(() => {
    // Init services.
    const db = getFirestore()

    // Create a reference to the Firestore collection
    const colRef = collection(db, 'books')

    // Get collection data.
    getDocs(colRef)
    .then(snapshot => {
        // console.log(snapshot.docs)
        let books = []
        snapshot.docs.forEach(doc => {
        books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
        setPosts(books);
    })
    .catch(err => {
        console.log(err.message)
    })
  }, []);

    // Function to handle form submission
    const handleAddBook = async (e) => {
      e.preventDefault();
  
      try {
        // Add the new book data to Firestore
        const db = getFirestore();
        const bookRef = collection(db, 'books');
        await addDoc(bookRef, newBook);
  
        // Clear the form
        setNewBook({ title: '', author: '' });
  
        // Refresh the list of books
        const colRef = collection(db, 'books');
        const snapshot = await getDocs(colRef);
        let books = [];
        snapshot.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        setPosts(books);
      } catch (error) {
        console.error(error.message);
      }
    };

  return (
    <>
      {/* <Header /> */}
      <div className={styles.homeContainer}>
        <h1>Home Page</h1>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="dash/admin/dashboard">Dashboard</Link>
        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
      </div>

      <main>
        {/* Beautiful homepage content */}
        <section className="hero">
          <h1>Welcome to new monash Website</h1>
          <p>Discover amazing content and more.</p>
        </section>
        <section className="features">
          {/* Feature sections */}
          <div className="feature">
            <h2>Feature 1</h2>
            <p>Feature 1 description.</p>
          </div>
          <div className="feature">
            <h2>Feature 2</h2>
            <p>Feature 2 description.</p>
          </div>
          {/* Add more features as needed */}

        </section>
        <section className="hero1">
        <div>
            <h1>Welcome to Your Website</h1>
            <h2>Recent Posts</h2>
            <ul>
                {posts.map((post) => (
                <li key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </li>
                ))}
            </ul>
            </div>
        </section>


        <section className="add-book">
          <h2>Add a New Book</h2>
          <form onSubmit={handleAddBook}>
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
            <button type="submit">Add Book</button>
          </form>
        </section>


        <div className="container-xxl bg-white p-0">
            {/* <Spinner /> */}
        </div>

      </main>




      <>
        {/* <Spinner /> */}

        <Header />

        {/* Service Start */}
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="service-item rounded pt-3">
                            <div className="p-4">
                                <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
                                <h5>Master Chefs</h5>
                                <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="service-item rounded pt-3">
                            <div className="p-4">
                                <i className="fa fa-3x fa-utensils text-primary mb-4"></i>
                                <h5>Quality Food</h5>
                                <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="service-item rounded pt-3">
                            <div className="p-4">
                                <i className="fa fa-3x fa-cart-plus text-primary mb-4"></i>
                                <h5>Online Order</h5>
                                <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                        <div className="service-item rounded pt-3">
                            <div className="p-4">
                                <i className="fa fa-3x fa-headset text-primary mb-4"></i>
                                <h5>24/7 Service</h5>
                                <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Service End */}

        {/* About Start */}
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6">
                        <div className="row g-3">
                            <div className="col-6 text-start">
                                <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.1s" src="./public/images/website/about-1.jpg" />
                            </div>
                            <div className="col-6 text-start">
                                {/* <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.3s" src="./public/images/website/about-2.jpg" style="margin-top: 25%;" /> */}
                            </div>
                            <div className="col-6 text-end">
                                <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.5s" src="./public/images/website/about-3.jpg" />
                            </div>
                            <div className="col-6 text-end">
                                <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.7s" src="./public/images/website/about-4.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h5 className="section-title ff-secondary text-start text-primary fw-normal">About Us</h5>
                        <h1 className="mb-4">Welcome to <i className="fa fa-utensils text-primary me-2"></i>Restoran</h1>
                        <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit.</p>
                        <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                        <div className="row g-4 mb-4">
                            <div className="col-sm-6">
                                <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                                    <h1 className="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">15</h1>
                                    <div className="ps-4">
                                        <p className="mb-0">Years of</p>
                                        <h6 className="text-uppercase mb-0">Experience</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                                    <h1 className="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">50</h1>
                                    <div className="ps-4">
                                        <p className="mb-0">Popular</p>
                                        <h6 className="text-uppercase mb-0">Master Chefs</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="btn btn-primary py-3 px-5 mt-2" href="">Read More</a>
                    </div>
                </div>
            </div>
        </div>
        {/* About End */}

        {/* Menu Start */}
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
                    <h1 className="mb-5">Most Popular Items</h1>
                </div>
                <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.1s">
                    <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                        <li className="nav-item">
                            <a className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href="#tab-1">
                                <i className="fa fa-coffee fa-2x text-primary"></i>
                                <div className="ps-3">
                                    <small className="text-body">Popular</small>
                                    <h6 className="mt-n1 mb-0">Breakfast</h6>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="d-flex align-items-center text-start mx-3 pb-3" data-bs-toggle="pill" href="#tab-2">
                                <i className="fa fa-hamburger fa-2x text-primary"></i>
                                <div className="ps-3">
                                    <small className="text-body">Special</small>
                                    <h6 className="mt-n1 mb-0">Launch</h6>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="d-flex align-items-center text-start mx-3 me-0 pb-3" data-bs-toggle="pill" href="#tab-3">
                                <i className="fa fa-utensils fa-2x text-primary"></i>
                                <div className="ps-3">
                                    <small className="text-body">Lovely</small>
                                    <h6 className="mt-n1 mb-0">Dinner</h6>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="tab-1" className="tab-pane fade show p-0 active">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-1.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-2.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-3.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-4.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-5.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-6.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-7.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-8.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tab-2" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-1.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-2.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-3.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-4.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-5.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-6.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-7.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-8.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tab-3" className="tab-pane fade show p-0">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-1.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-2.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-3.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-4.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-5.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-6.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-7.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex align-items-center">
                                        {/* <img className="flex-shrink-0 img-fluid rounded" src="img/menu-8.jpg" alt="" style="width: 80px;"> */}
                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                <span>Chicken Burger</span>
                                                <span className="text-primary">$115</span>
                                            </h5>
                                            <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Menu End */}




        <Footer />

        <BackToTop />
      </>
    </>
  );
}

export default Home;
