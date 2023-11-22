import Navbar from "./Navbar";
import Footer from "./Footer";
import Announcement from "./Announcement";

type Props = {
  hideNavbar?: boolean;
  hideFooter?: boolean;
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { hideNavbar = false, hideFooter = false, children } = props;

  return (
    <>
      <Announcement />
      <div className="bg-white text-gray-[#4047d3] w-max md:w-full min-h-screen px-14">
        {!hideNavbar && <Navbar />}
        <main>{children}</main>
        {!hideFooter && <Footer />}
      </div>
    </>
  );
};

export default Layout;
