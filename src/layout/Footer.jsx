import { useMemo } from 'react';
import { useFetchRestaurant } from '../api';
import Apk from '../components/AppLinks';
import SwiggySVG from './../assets/swiggy-1white.svg';
const Footer = () => {
  //   px-10 py-10 md:px-64 md:pt-12 md:pb-20 md:mt-20
  const { data: SwiggyData, fetch } = useFetchRestaurant();
  const apkData = useMemo(() => {
    return SwiggyData?.find(
      ({ card }) => card?.card?.id === 'app_install_links'
    );
  }, [SwiggyData]);

  const { title, iosAppImage, androidAppImage, androidAppLink, iosAppLink } =
    apkData?.card?.card || {};

  return (
    <>
      <Apk
        isFetching={fetch}
        title={title}
        androidImage={androidAppImage}
        IosImage={iosAppImage}
        IosLink={iosAppLink}
        androidLink={androidAppLink}
      />
      <footer className="bg-gray-950 text-white px-10 py-10 md:px-64 md:pt-12 md:pb-20 md:mt-20 flex flex-wrap gap-32 ">
        <div className="flex gap-3 flex-col">
          <div className="flex gap-3">
            <img src={SwiggySVG} className="w-6" />
            <p className="text-2xl font-bold">Swiggy</p>
          </div>
          <div className="text-sm text-gray-400">@2023 Arun Pvt. Ltd</div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-medium">Company</div>
          <div className="text-gray-400 flex flex-col gap-3">
            <div>About</div>
            <div>Carrers</div>
            <div>Team</div>
            <div>Swiggy One</div>
            <div>Swiggy Instamart</div>
            <div>Swiggy Genie</div>
          </div>
        </div>
        <div className="flex gap-10 flex-col">
          <div className="flex flex-col gap-4">
            <div className="text-lg font-medium">Contact us</div>
            <div className="text-gray-400 flex flex-col gap-3">
              <div>Help & Support</div>
              <div>Partner with us</div>
              <div>Ride with us</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-lg font-medium">Legal</div>
            <div className="text-gray-400 flex flex-col gap-3">
              <div>Terms & Condition</div>
              <div>Cookie Policy</div>
              <div>Privacy Policy</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-medium">We Deliever to:</div>
          <div className="text-gray-400 flex flex-col gap-3">
            <div>Bangalore</div>
            <div>Gurgaon</div>
            <div>Hyderbad</div>
            <div>Delhi</div>
            <div>Mumbai</div>
            <div>Pune</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
