import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};

