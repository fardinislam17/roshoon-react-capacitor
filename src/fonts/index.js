import RobotoThinFont from './Roboto/Roboto-Thin.ttf';
import RobotLightFont from './Roboto/Roboto-Light.ttf';
import RobotoRegularFont from './Roboto/Roboto-Regular.ttf';
import RobotoMediumFont from './Roboto/Roboto-Medium.ttf';
import RobotBoldFont from './Roboto/Roboto-Bold.ttf';

const RobotoFontFamily = `
  @font-face {
    font-family: "Roboto";
    font-weight: 100;
    font-style: normal;
    src: url(${RobotoThinFont}) format("truetype");
  }
  @font-face {
    font-family: "Roboto";
    font-weight: 300;
    font-style: normal;
    src: url(${RobotLightFont}) format("truetype");
  }
  @font-face {
    font-family: "Roboto";
    font-weight: 400;
    font-style: normal;
    src: url(${RobotoRegularFont}) format("truetype");
  }
  @font-face {
    font-family: "Roboto";
    font-weight: 500;
    font-style: normal;
    src: url(${RobotoMediumFont}) format("truetype");
  }
  @font-face {
    font-family: "Roboto";
    font-weight: 700;
    font-style: normal;
    src: url(${RobotBoldFont}) format("truetype");
  }
`;

export default RobotoFontFamily;
