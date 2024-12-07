import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import Script from 'next/script'


const HomeLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) =>{
  return (
    <>
   <script src="https://www.payhere.lk/lib/payhere.js"></script>
      <NavBar />
      <div className="w-full min-h-screen ">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default HomeLayout;

