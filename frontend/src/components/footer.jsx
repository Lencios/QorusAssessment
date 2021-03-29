import {
  Button,
  FormControl,
} from "react-bootstrap";
import "./footer.scss";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Footer = ({
  isDisabled,
  category,
  categoryError,
  onChangeCategory,
  onChangeDate,
  lastReviewDate,
  submit
}) => {
  return (
    <div>
      <div className="footer-components">
        <div className="category">
          <FormControl
            id="category"
            placeholder="category"
            className="category mb-0"
            value={category}
            isInvalid={categoryError}
            onChange={onChangeCategory}
          />
        </div>
        <div className="last-reviewed">
          <DatePicker
            selected={lastReviewDate}
            onSelect={(date) => onChangeDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div className="footer-buttons">
        <Button
          className={`${isDisabled ? "isDisabled" : "isAllowed"} primary`}
          size="sm"
          variant="primary"
          disabled={isDisabled}
          onClick={submit}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Footer;
