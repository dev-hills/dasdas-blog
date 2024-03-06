import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import arrow from "/arrow.png";
import { Link } from "react-router-dom";

const ArticleCard = ({
  image,
  category,
  date,
  title,
  description,
  time,
  descriptionFull,
  titleFull,
  id,
}) => {
  return (
    <div className="w-[350px] sm:w-[100%] h-[420px] p-[10px] border-[1px] border-[#F5F5F5] rounded-[5px] flex flex-col">
      <img
        src={image}
        alt=""
        className="w-[320px] h-[200px] object-cover sm:w-[100%]"
      />

      <div className="flex flex-row items-center gap-[4px] mt-[16px]">
        <span className="font-medium text-[12px] text-[#4B4B4B]">
          {category}
        </span>
        <span className="w-[3px] h-[3px] bg-[#6E6E6E] rounded-full"></span>
        <span className="font-medium text-[12px] text-[#6E6E6E]">{date}</span>
      </div>

      <div className="mt-[8px]">
        <h1
          className="font-bold text-[18px]"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={titleFull}
        >
          {title}
        </h1>
        <p
          className="font-normal text-[14px] text-[#6E6E6E] mt-[8px]"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={descriptionFull}
        >
          <Tooltip id="my-tooltip" />
          {description}
        </p>
      </div>

      <div className="flex flex-row items-center justify-between mt-[20px]">
        <p className="font-medium text-[#6E6E6E] text-[12px]">{time}</p>

        <Link to={`/article/${id}`}>
          <p className="font-bold text-[#1473E6] text-[12divx] flex flex-row items-center">
            Read Full
            <img src={arrow} alt="" />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
