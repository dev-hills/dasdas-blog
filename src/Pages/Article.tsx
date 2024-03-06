/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getArticlebyId, getMoreArticles } from "../utils/api";
import ArticleCard from "../components/ArticleCard";
import { motion } from "framer-motion";

const Article = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [moreArticles, setMoreArticles] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getArticlebyId(id);
        setData(result);
        setLoadingState(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMoreArticles();
        setMoreArticles(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  const formattedDate = (date) => {
    const newDate = new Date(date);

    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
      className="px-[148px] sm:px-[5px] lg:px-[10px]"
    >
      <Navbar />

      {loadingState ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="custom-loader"
        ></motion.div>
      ) : (
        <>
          <div className="mt-[56px] px-[208px] sm:px-[5px] lg:px-[10px]">
            <div className="flex flex-row gap-[4px]">
              <span className="text-[15px] text-[#6E6E6E] font-normal">
                By {data?.yoast_head_json?.author}
              </span>

              <span className="font-medium text-[15px] text-[#6E6E6E]">
                {formattedDate(data?.yoast_head_json?.article_published_time)}
              </span>
            </div>

            <div>
              <h1 className="font-black text-[32px] sm:text-[25px] text-[#2C2C2C]">
                {data?.yoast_head_json?.title}
              </h1>

              <div
                className="article font-medium text-[14px] leading-[21px] text-[#6E6E6E]"
                dangerouslySetInnerHTML={{ __html: data?.content?.rendered }}
              />
            </div>
          </div>

          <div className="mt-[150px] mb-[200px]">
            <h1 className="font-black text-[20px]">More Articles</h1>

            <div className="mt-[23px] flex flex-row items-center flex-wrap justify-center gap-x-[80px] lg:gap-x-[180px] gap-y-[48px]">
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
                  {moreArticles?.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.5 }}
                    >
                      <ArticleCard
                        image={item?.jetpack_featured_media_url}
                        category={
                          item?.yoast_head_json?.schema["@graph"][0]
                            .articleSection[0]
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
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Article;
