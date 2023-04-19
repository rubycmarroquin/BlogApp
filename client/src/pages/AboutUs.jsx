import char from "../assets/char.png";
import * as ioicons from "react-icons/io5";
const AboutUs = ({}) => {
  return (
    <div className="AboutMainDiv" style={{ marginTop: "40px" }}>
      <h1>
        About{" "}
        <span id="meSpan" style={{ color: "#39fce9" }}>
          Me
        </span>
      </h1>
      <img id="charimg" src={char} alt="Game Image" />
      <div class="section-content">
        <h3>
          <span class="tag">Ruby Celete Marroquin</span>
          <span style={{ fontSize: "large", color: "darkgray" }}>
            <br></br>Full Stack Developer (PERN Stack)
          </span>
        </h3>
        <div class="about">
          {" "}
          I grew up in Los Angeles, California, and I'm the youngest of four. I
          was raised to focus on my education and became the first in my family
          to attend college, where I focused on mathematics and was a math (
          <em>primarily algebra and pre-calculus</em>) tutor for a few years. I
          then went to University of California, San Diego (UCSD), where I
          planned on getting a Computer Science Degree. The program eventually
          became too expensive for me to continue so I left with a ~2.5 years of
          CS undergrad under my belt. Despite these fallbacks, I persevered and
          found an alternate way to fulfill my dream of becoming a Software
          Engineer. I am excited to continue my journey of becoming a software
          engineer at Techtonica!
        </div>
        <div class="box" style={{ marginTop: "15px" }}>
          <p>
            <ioicons.IoMapOutline
              style={{ fontSize: "25px", color: "#39fce9" }}
            />{" "}
            Los Angeles, CA 90731{" "}
          </p>
        </div>
      </div>
      <div className="socials">
        <a
          className="socialicons"
          href={"https://www.linkedin.com/in/rubymarroquin/"}
        >
          <ioicons.IoLogoLinkedin style={{ fontSize: "35px" }} />
        </a>
        <a className="socialicons" href={"https://github.com/rubycmarroquin"}>
          <ioicons.IoGitMerge style={{ fontSize: "35px" }} />
        </a>
        <a className="socialicons" href={"https://twitter.com/RubyCMarroquin"}>
          <ioicons.IoLogoTwitter style={{ fontSize: "35px" }} />
        </a>
      </div>
    </div>
  );
};
export default AboutUs;
