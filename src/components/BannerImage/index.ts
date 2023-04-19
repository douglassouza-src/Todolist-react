import styled from 'styled-components';
import imagebg from '../../assets/image-bg.jpg';

const BannerImage = styled.figure`
  width: 70%;
  height: 100%;
  border: 30px solid black;
  background-image: url(${imagebg});
  background-size: cover;
  background-position: center;
`;

export { BannerImage};