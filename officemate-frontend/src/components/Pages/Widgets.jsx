import Lottie from "lottie-react";
import calendar from "../../assets/styles/calendar.json";
import note from "../../assets/styles/addnotes.json";
import converter from "../../assets/styles/pdf.json";
import { Link } from "react-router-dom";
import "../../styles/style.css";

function Widgets() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 mx-4  lg:mx-10 items-center justify-items-center gap-3   lg:gap-4 my-10 lg:my-0 lg:h-screen">
        <Link to="/calendar">
          <div className="">
            <div className="card card-compact  bg-customBlue text-white shadow-2xl">
              <figure>
                <Lottie
                  animationData={calendar}
                  loop={true}
                  id="card_Style"
                />
              </figure>
              <div className="card-body text-center">
                <h2 className="text-3xl font-bold italic">Calendar</h2>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/Notes">
          <div>
            <div className="card card-compact  bg-customBlue text-white shadow-2xl">
              <figure>
                <Lottie
                  animationData={note}
                  loop={true}
                  id="card_Style"
                />
              </figure>
              <div className="card-body text-center">
                <h2 className="text-3xl font-bold italic">Note</h2>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/pdfConverter">
          <div>
            <div className="card card-compact  bg-customBlue text-white shadow-2xl">
              <figure>
                <Lottie
                  animationData={converter}
                  loop={true}
                  id="card_Style"
                />
              </figure>
              <div className="card-body text-center">
                <h2 className="text-3xl font-bold italic">Coming soon</h2>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Widgets;
