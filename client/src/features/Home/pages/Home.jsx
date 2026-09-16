import React from 'react'
import { useChangeTitle } from '../../../shared/Utils/useChangeTitle'
import { NavLink } from 'react-router-dom';
import HeroSection from '../Components/heroSection';

export default function Homepage() {

  useChangeTitle({title:"Home"})
  
  return (
    <div className="homepage container">
      <HeroSection/>
 

      <div className="container">
        {/* ===================== FLASH SALES ===================== */}
        <section className="py-5">
          <p className="text-danger fw-bold mb-1">
            <span className="bg-danger d-inline-block me-2" style={{ width: 20, height: 40, verticalAlign: "middle" }}></span>
            Today's
          </p>
          <div className="d-flex justify-content-between align-items-end flex-wrap mb-4">
            <h2 className="fw-bold">Flash Sales</h2>
            <div className="d-flex gap-3 text-center">
              <div>
                <div className="small">Days</div>
                <div className="fw-bold fs-4">03</div>
              </div>
              <div className="fw-bold fs-4">:</div>
              <div>
                <div className="small">Hours</div>
                <div className="fw-bold fs-4">23</div>
              </div>
              <div className="fw-bold fs-4">:</div>
              <div>
                <div className="small">Minutes</div>
                <div className="fw-bold fs-4">19</div>
              </div>
              <div className="fw-bold fs-4">:</div>
              <div>
                <div className="small">Seconds</div>
                <div className="fw-bold fs-4">56</div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Product 1 */}
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 position-relative">
                <span className="badge bg-danger position-absolute m-2">-40%</span>
                <i className="bi bi-heart position-absolute top-0 end-0 m-2 fs-5"></i>
                <img
                  src="https://placehold.co/300x220/f5f5f5/333333?text=Gamepad"
                  className="card-img-top p-3"
                  alt="HAVIT Gamepad"
                />
                <button className="btn btn-dark rounded-0 w-100">Add To Cart</button>
                <div className="card-body px-0">
                  <h6 className="mb-1">HAVIT HV-G92 Gamepad</h6>
                  <div>
                    <span className="text-danger fw-bold me-2">$120</span>
                    <span className="text-muted text-decoration-line-through">$160</span>
                  </div>
                  <div className="text-warning small">
                    ★★★★★ <span className="text-muted">(88)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 position-relative">
                <span className="badge bg-danger position-absolute m-2">-35%</span>
                <i className="bi bi-heart position-absolute top-0 end-0 m-2 fs-5"></i>
                <img
                  src="https://placehold.co/300x220/f5f5f5/333333?text=Keyboard"
                  className="card-img-top p-3"
                  alt="AK-900 Keyboard"
                />
                <button className="btn btn-dark rounded-0 w-100">Add To Cart</button>
                <div className="card-body px-0">
                  <h6 className="mb-1">AK-900 Wired Keyboard</h6>
                  <div>
                    <span className="text-danger fw-bold me-2">$960</span>
                    <span className="text-muted text-decoration-line-through">$1160</span>
                  </div>
                  <div className="text-warning small">
                    ★★★★★ <span className="text-muted">(75)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 position-relative">
                <span className="badge bg-danger position-absolute m-2">-30%</span>
                <i className="bi bi-heart position-absolute top-0 end-0 m-2 fs-5"></i>
                <img
                  src="https://placehold.co/300x220/f5f5f5/333333?text=Camera"
                  className="card-img-top p-3"
                  alt="IPS LCD Gaming Monitor"
                />
                <button className="btn btn-dark rounded-0 w-100">Add To Cart</button>
                <div className="card-body px-0">
                  <h6 className="mb-1">IPS LCD Gaming Monitor</h6>
                  <div>
                    <span className="text-danger fw-bold me-2">$370</span>
                    <span className="text-muted text-decoration-line-through">$400</span>
                  </div>
                  <div className="text-warning small">
                    ★★★★★ <span className="text-muted">(99)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 position-relative">
                <i className="bi bi-heart position-absolute top-0 end-0 m-2 fs-5"></i>
                <img
                  src="https://placehold.co/300x220/f5f5f5/333333?text=Chair"
                  className="card-img-top p-3"
                  alt="S-Series Comfort Chair"
                />
                <button className="btn btn-dark rounded-0 w-100">Add To Cart</button>
                <div className="card-body px-0">
                  <h6 className="mb-1">S-Series Comfort Chair</h6>
                  <div>
                    <span className="text-danger fw-bold me-2">$375</span>
                    <span className="text-muted text-decoration-line-through">$400</span>
                  </div>
                  <div className="text-warning small">
                    ★★★★★ <span className="text-muted">(99)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <NavLink to={"/products"} className="btn btn-danger px-4">View All Products</NavLink>
          </div>
        </section>

        <hr className="my-5" />

        {/* ===================== BROWSE BY CATEGORY ===================== */}
        <section className="py-5">
          <p className="text-danger fw-bold mb-1">
            <span className="bg-danger d-inline-block me-2" style={{ width: 20, height: 40, verticalAlign: "middle" }}></span>
            Categories
          </p>
          <h2 className="fw-bold mb-4">Browse By Category</h2>

          <div className="row g-3 text-center">
            <div className="col-6 col-md-2">
              <div className="border rounded p-4">
                <i className="bi bi-phone fs-2 d-block mb-2"></i>
                Phones
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="border rounded p-4">
                <i className="bi bi-laptop fs-2 d-block mb-2"></i>
                Computers
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="border rounded p-4 bg-danger text-white">
                <i className="bi bi-camera fs-2 d-block mb-2"></i>
                Camera
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="border rounded p-4">
                <i className="bi bi-smartwatch fs-2 d-block mb-2"></i>
                SmartWatch
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="border rounded p-4">
                <i className="bi bi-headphones fs-2 d-block mb-2"></i>
                HeadPhones
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="border rounded p-4">
                <i className="bi bi-controller fs-2 d-block mb-2"></i>
                Gaming
              </div>
            </div>
          </div>
        </section>

        <hr className="my-5" />

        {/* ===================== BEST SELLING PRODUCTS ===================== */}
        <section className="py-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <p className="text-danger fw-bold mb-1">
                <span className="bg-danger d-inline-block me-2" style={{ width: 20, height: 40, verticalAlign: "middle" }}></span>
                This Month
              </p>
              <h2 className="fw-bold">Best Selling Products</h2>
            </div>
            <button className="btn btn-danger px-4">View All</button>
          </div>

          <div className="row g-4">
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img
                  src="https://placehold.co/300x220/f5f5f5/333333?text=Jacket"
                  className="card-img-top p-3"
                  alt="Jacket"
                />
                <div className="card-body px-0">
                  <h6 className="mb-1">The North Coat</h6>
                  <div>
                    <span className="text-danger fw-bold me-2">$260</span>
                    <span className="text-muted text-decoration-line-through">$360</span>
                  </div>
                  <div className="text-warning small">
                    ★★★★★ <span className="text-muted">(65)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img
                  src="https://placehold.co/300x220/f5f5f5/333333?text=Bag"
                  className="card-img-top p-3"
                  alt="Bag"
                />
                <div className="card-body px-0">
                  <h6 className="mb-1">Gucci Duffle Bag</h6>
                  <div>
                    <span className="text-danger fw-bold me-2">$960</span>
                    <span className="text-muted text-decoration-line-through">$1160</span>
                  </div>
                  <div className="text-warning small">
                    ★★★★★ <span className="text-muted">(65)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img
                  src="https://placehold.co/300x220/f5f5f5/333333?text=Case"
                  className="card-img-top p-3"
                  alt="Case"
                />
                <div className="card-body px-0">
                  <h6 className="mb-1">RGB Liquid CPU Cooler</h6>
                  <div>
                    <span className="text-danger fw-bold me-2">$160</span>
                    <span className="text-muted text-decoration-line-through">$170</span>
                  </div>
                  <div className="text-warning small">
                    ★★★★★ <span className="text-muted">(65)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img
                  src="https://placehold.co/300x220/f5f5f5/333333?text=Pants"
                  className="card-img-top p-3"
                  alt="Pants"
                />
                <div className="card-body px-0">
                  <h6 className="mb-1">Small BookShelf</h6>
                  <div>
                    <span className="text-danger fw-bold me-2">$360</span>
                    <span className="text-muted text-decoration-line-through">$400</span>
                  </div>
                  <div className="text-warning small">
                    ★★★★★ <span className="text-muted">(65)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===================== MUSIC EXPERIENCE BANNER ===================== */}
      <section className="bg-dark text-white py-5 mt-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-success mb-2">Categories</p>
              <h2 className="display-5 fw-bold mb-4">
                Enhance Your <br /> Music Experience
              </h2>
              <div className="d-flex gap-2 mb-4">
                <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  23<br />Hours
                </div>
                <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  05<br />Days
                </div>
                <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  59<br />Min
                </div>
                <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  35<br />Sec
                </div>
              </div>
              <button className="btn btn-success px-4">Buy Now!</button>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src="https://placehold.co/400x300/111111/ffffff?text=Speaker"
                alt="Speaker"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* ===================== EXPLORE OUR PRODUCTS ===================== */}
        <section className="py-5">
          <p className="text-danger fw-bold mb-1">
            <span className="bg-danger d-inline-block me-2" style={{ width: 20, height: 40, verticalAlign: "middle" }}></span>
            Our Products
          </p>
          <h2 className="fw-bold mb-4">Explore Our Products</h2>

          <div className="row g-4">
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img src="https://placehold.co/300x220/f5f5f5/333333?text=Camera" className="card-img-top p-3" alt="Camera" />
                <div className="card-body px-0">
                  <h6 className="mb-1">Breed Dry Dog Food</h6>
                  <div className="text-danger fw-bold">$100</div>
                  <div className="text-warning small">★★★★★ <span className="text-muted">(35)</span></div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img src="https://placehold.co/300x220/f5f5f5/333333?text=Bike" className="card-img-top p-3" alt="Bike" />
                <div className="card-body px-0">
                  <h6 className="mb-1">CANON EOS DSLR Camera</h6>
                  <div className="text-danger fw-bold">$360</div>
                  <div className="text-warning small">★★★★★ <span className="text-muted">(95)</span></div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img src="https://placehold.co/300x220/f5f5f5/333333?text=Watch" className="card-img-top p-3" alt="Watch" />
                <div className="card-body px-0">
                  <h6 className="mb-1">ASUS FHD Gaming Laptop</h6>
                  <div className="text-danger fw-bold">$700</div>
                  <div className="text-warning small">★★★★★ <span className="text-muted">(325)</span></div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img src="https://placehold.co/300x220/f5f5f5/333333?text=Shoes" className="card-img-top p-3" alt="Shoes" />
                <div className="card-body px-0">
                  <h6 className="mb-1">Curology Product Set</h6>
                  <div className="text-danger fw-bold">$500</div>
                  <div className="text-warning small">★★★★★ <span className="text-muted">(145)</span></div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img src="https://placehold.co/300x220/f5f5f5/333333?text=Cleats" className="card-img-top p-3" alt="Cleats" />
                <div className="card-body px-0">
                  <h6 className="mb-1">Kids Electric Car</h6>
                  <div className="text-danger fw-bold">$960</div>
                  <div className="text-warning small">★★★★★ <span className="text-muted">(65)</span></div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img src="https://placehold.co/300x220/f5f5f5/333333?text=Cleats" className="card-img-top p-3" alt="Cleats" />
                <div className="card-body px-0">
                  <h6 className="mb-1">Jr. Zoom Soccer Cleats</h6>
                  <div className="text-danger fw-bold">$1160</div>
                  <div className="text-warning small">★★★★★ <span className="text-muted">(35)</span></div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img src="https://placehold.co/300x220/f5f5f5/333333?text=Controller" className="card-img-top p-3" alt="Controller" />
                <div className="card-body px-0">
                  <h6 className="mb-1">GP11 Shooter USB Gamepad</h6>
                  <div className="text-danger fw-bold">$660</div>
                  <div className="text-warning small">★★★★★ <span className="text-muted">(55)</span></div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card h-100 border-0">
                <img src="https://placehold.co/300x220/f5f5f5/333333?text=Jacket" className="card-img-top p-3" alt="Jacket" />
                <div className="card-body px-0">
                  <h6 className="mb-1">Quilted Satin Jacket</h6>
                  <div className="text-danger fw-bold">$660</div>
                  <div className="text-warning small">★★★★★ <span className="text-muted">(55)</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-danger px-4">View All Products</button>
          </div>
        </section>

        <hr className="my-5" />

        {/* ===================== NEW ARRIVAL ===================== */}
        <section className="py-5">
          <p className="text-danger fw-bold mb-1">
            <span className="bg-danger d-inline-block me-2" style={{ width: 20, height: 40, verticalAlign: "middle" }}></span>
            Featured
          </p>
          <h2 className="fw-bold mb-4">New Arrival</h2>

          <div className="row g-3">
            <div className="col-md-6">
              <div
                className="position-relative text-white d-flex align-items-end p-4"
                style={{
                  backgroundImage: "url(https://placehold.co/600x500/1a1a1a/ffffff?text=PlayStation+5)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: 500,
                }}
              >
                <div>
                  <h5 className="fw-bold">PlayStation 5</h5>
                  <p className="small mb-2">Black and White version of the PS5 coming out on sale.</p>
                  <a href="#" className="text-white text-decoration-underline">Shop Now</a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="row g-3">
                <div className="col-12">
                  <div
                    className="position-relative text-white d-flex align-items-end p-4"
                    style={{
                      backgroundImage: "url(https://placehold.co/600x230/1a1a1a/ffffff?text=Women's+Collections)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: 240,
                    }}
                  >
                    <div>
                      <h5 className="fw-bold">Women's Collections</h5>
                      <p className="small mb-2">Featured woman collections that give you another vibe.</p>
                      <a href="#" className="text-white text-decoration-underline">Shop Now</a>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="position-relative text-white d-flex align-items-end p-3"
                    style={{
                      backgroundImage: "url(https://placehold.co/300x230/1a1a1a/ffffff?text=Speakers)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: 240,
                    }}
                  >
                    <div>
                      <h6 className="fw-bold">Speakers</h6>
                      <p className="small mb-1">Amazon wireless speakers</p>
                      <a href="#" className="text-white text-decoration-underline small">Shop Now</a>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="position-relative text-white d-flex align-items-end p-3"
                    style={{
                      backgroundImage: "url(https://placehold.co/300x230/1a1a1a/ffffff?text=Perfume)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: 240,
                    }}
                  >
                    <div>
                      <h6 className="fw-bold">Perfume</h6>
                      <p className="small mb-1">GUCCI INTENSE OUD EDP</p>
                      <a href="#" className="text-white text-decoration-underline small">Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===================== SERVICE FEATURES ===================== */}
      <section className="py-5 border-top">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 60, height: 60 }}>
                <i className="bi bi-truck fs-4"></i>
              </div>
              <h6 className="fw-bold">FREE AND FAST DELIVERY</h6>
              <p className="text-muted small">Free delivery for all orders over $140</p>
            </div>
            <div className="col-md-4">
              <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 60, height: 60 }}>
                <i className="bi bi-headset fs-4"></i>
              </div>
              <h6 className="fw-bold">24/7 CUSTOMER SERVICE</h6>
              <p className="text-muted small">Friendly 24/7 customer support</p>
            </div>
            <div className="col-md-4">
              <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 60, height: 60 }}>
                <i className="bi bi-shield-check fs-4"></i>
              </div>
              <h6 className="fw-bold">MONEY BACK GUARANTEE</h6>
              <p className="text-muted small">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
