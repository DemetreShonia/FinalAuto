import { FiChevronRight } from "react-icons/fi";
import "../Styles/TextLine.css";
const TextLine = () => {
  return (
    <div className="text-line">
      <div className="page-text">
        <div className="grey-text">მთავარი</div>
        <FiChevronRight className="grey-text" />
        <div className="grey-text">ძიება</div>
        <FiChevronRight className="grey-text" />
        <div className="orange-text">იყიდება</div>
      </div>
    </div>
  );
};

export default TextLine;
