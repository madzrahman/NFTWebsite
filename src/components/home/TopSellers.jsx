import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSeller] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchTopSellers() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setSeller(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-md-12">
              <ol className="author_list">
                {sellers.length > 0 && !loading
                  ? sellers.map((seller, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <Link to={`/author/${seller.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={seller.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${seller.authorId}`}>
                            {seller.authorName}
                          </Link>
                          <span>{seller.price}</span>
                        </div>
                      </li>
                    ))
                  : new Array(12).fill(0).map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius={999}
                          />
                        </div>
                        <div className="author_list_info"></div>
                      </li>
                    ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
