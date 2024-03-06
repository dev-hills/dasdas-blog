/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Featured from "../components/Featured";
import ArticleCard from "../components/ArticleCard";
import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";

const Home = () => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getArticles(currentPage, 10);
        setData(result);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const truncatedWordTitle = (word) => {
    const words = word.split("");

    const truncatedDescription = words.slice(0, 67).join("") + " ...";

    return truncatedDescription;
  };

  const truncatedWordDesc = (word) => {
    const words = word.split("");

    const truncatedDescription = words.slice(0, 108).join("") + " ......";

    return truncatedDescription;
  };

  const formattedDate = (date) => {
    const newDate = new Date(date);

    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
      className="px-[148px] sm:px-[5px] lg:px-[10px]"
    >
      <Navbar />

      <Featured />

      <div className="mt-[52px] flex flex-row items-center flex-wrap justify-center gap-x-[86px] lg:gap-x-[180px] gap-y-[48px]">
        {loading ? (
          Array.from({ length: 10 }).map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.5 }}
              className="w-[350px] sm:w-[100%] h-[200px] bg-gray-300 animate-pulse rounded-lg"
            ></motion.div>
          ))
        ) : (
          <>
            {data?.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.5 }}
              >
                <ArticleCard
                  image={item?.jetpack_featured_media_url}
                  category={
                    item?.yoast_head_json?.schema["@graph"][0].articleSection[0]
                  }
                  date={formattedDate(item?.date_gmt)}
                  title={truncatedWordTitle(item?.yoast_head_json?.title)}
                  description={truncatedWordDesc(
                    item?.yoast_head_json?.description
                  )}
                  time={"3 Min read"}
                  descriptionFull={item?.yoast_head_json?.description}
                  titleFull={item?.yoast_head_json?.title}
                  id={item?.id}
                />
              </motion.div>
            ))}
          </>
        )}
      </div>

      <div className="flex justify-center mt-[50px]">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l focus:outline-none focus:ring focus:ring-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r focus:outline-none focus:ring focus:ring-gray-400"
        >
          Next
        </button>
      </div>

      <div className="mt-[156px] flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-medium text-[32px] text-[#2C2C2C]"
        >
          Join our Team of Writers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center w-[800px] sm:w-[100%] font-normal text-[22px] leading-[32px] text-[#6E6E6E] mt-[12px]"
        >
          On dasdas, writers earn a living doing what they love. Getting started
          is easy. Just pay a one time <span className="font-bold">$25</span>{" "}
          fee and everything is ready to go.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="px-[55px] py-[12px] bg-black text-white font-medium text-[18px] mt-[47px] mb-[227px] sm:mb-[100px]"
        >
          Join us
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
