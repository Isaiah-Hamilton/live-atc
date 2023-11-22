import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  hideNavbar?: boolean;
  hideFooter?: boolean;
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { hideNavbar = false, hideFooter = false, children } = props;

  return (
    <div className="bg-white text-gray-[#232c34] w-max md:w-full min-h-screen px-14">
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
