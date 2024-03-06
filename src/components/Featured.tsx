/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getFeaturedArticles } from "../utils/api";
import arrow from "/arrow.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Featured = () => {
  const randomNumber = Math.floor(Math.random() * 10);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFeaturedArticles();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(data[randomNumber]);
  console.log(data[randomNumber]?.jetpack_featured_media_url);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
      className="mt-[48px] p-[8px] border-[1px] border-[#F5F5F5] rounded-[5px]"
    >
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-[1200px] sm:w-[100%] h-[280px] bg-gray-300 animate-pulse rounded-lg flex flex-row items-center justify-center"
        ></motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-row sm:flex-col items-center gap-[30px]"
        >
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            src={data[randomNumber]?.jetpack_featured_media_url}
            alt=""
            className="w-[500px] h-[280px] object-cover sm:w-[100%] sm:h-[200px]"
          />

          <div>
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="font-montserrat font-black text-[22px] sm:text-[15px]"
            >
              {data[randomNumber]?.yoast_head_json?.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="font-montserrat font-normal text-[15px] sm:text-[12px] text-[#6E6E6E] w-[100%] mt-[15px]"
            >
              {data[randomNumber]?.yoast_head_json?.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-row items-center justify-between mt-[20px]"
            >
              <p className="font-medium text-[#6E6E6E] text-[12px]">
                {data?.yoast_head_json?.twitter_misc?.["Est. reading time"]}
              </p>

              <Link to={`/article/${data[randomNumber]?.id}`}>
                <p className="font-bold text-[#1473E6] text-[12px] flex flex-row items-center">
                  Read Full
                  <img src={arrow} alt="" />
                </p>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Featured;
