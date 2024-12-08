import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";


const HomeLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) =>{
  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen ">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default HomeLayout;

